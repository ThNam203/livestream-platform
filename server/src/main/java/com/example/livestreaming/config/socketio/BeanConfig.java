package com.example.livestreaming.config.socketio;

import com.example.livestreaming.entity.ChatMessage;
import com.example.livestreaming.entity.ChatRoom;
import com.example.livestreaming.enums.MessageType;
import com.example.livestreaming.entity.RoomRequest;
import com.example.livestreaming.payload.CreateRoomRequestDTO;
import com.example.livestreaming.payload.JoinRoomRequestDTO;
import com.example.livestreaming.payload.UserDTO;
import com.example.livestreaming.utils.Common;
import com.example.livestreaming.utils.Json;
import io.socket.engineio.server.EngineIoServer;
import io.socket.engineio.server.EngineIoServerOptions;
import io.socket.socketio.server.SocketIoServer;
import io.socket.socketio.server.SocketIoSocket;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class BeanConfig {

    @Bean
    EngineIoServer engineIoServer() {
        var opt = EngineIoServerOptions.newFromDefault();
        opt.setCorsHandlingDisabled(true);
        var eioServer = new EngineIoServer(opt);
        return eioServer;
    }

    @Bean
    SocketIoServer socketIoServer(EngineIoServer eioServer) {
        var sioServer = new SocketIoServer(eioServer);
        var namespace = sioServer.namespace("/chat");
        HashMap<String, UserDTO> hmSocketUser = new HashMap<>();
        HashMap<String, Integer> hmSocketRoom = new HashMap<>();
        List<ChatRoom> chatRooms = new ArrayList<>();

        namespace.on("connection", args -> {
            var socket = (SocketIoSocket) args[0];

            socket.on("create", args1 -> {
                //get data from request
                JSONObject o = (JSONObject) args1[0];
                CreateRoomRequestDTO req = Json.toPojoObj(o, CreateRoomRequestDTO.class);

                //store necessary data
                ChatRoom newRoom = ChatRoom.builder().roomId(req.roomId).roomName(req.roomName).adminId(req.senderId).build();
                chatRooms.add(newRoom);
                hmSocketUser.put(socket.getId(), UserDTO.builder().id(req.senderId).username(req.senderName).build());
                hmSocketRoom.put(socket.getId(), newRoom.roomId);

                //join socket to room and send first message
                socket.joinRoom(req.roomId.toString());
                socket.send("message", Json.toJsonObj(ChatMessage.builder().time(Common.convertDateToISOString(new Date())).message("You created the chat room.").type(MessageType.JOIN).build()));
                ChatMessage firstMessage = ChatMessage.builder().time(Common.convertDateToISOString(new Date())).message(req.senderName + " created the chat room.").type(MessageType.JOIN).build();
                saveMessage(chatRooms, req.roomId, firstMessage);
            });

            socket.on("join", args1 -> {
                //get data from request
                JSONObject o = (JSONObject) args1[0];
                JoinRoomRequestDTO req = Json.toPojoObj(o, JoinRoomRequestDTO.class);

                //store necessary data
                hmSocketUser.put(socket.getId(), UserDTO.builder().id(req.senderId).username(req.sender).build());
                hmSocketRoom.put(socket.getId(), req.roomId);

                //add userId to room and get old messages
                List<ChatMessage> oldMessages = new ArrayList<>();
                chatRooms.stream().forEach(room -> {
                    if (room.roomId.equals(req.roomId)) {
                        try{
                            List<Integer> newUserIdList = new ArrayList<>(room.getUserIds() == null ? List.of() : room.getUserIds());
                            newUserIdList.add(req.senderId);
                            room.setUserIds(newUserIdList);

                            //get old messages
                            oldMessages.addAll(room.getMessages() == null ? List.of() : room.getMessages());
                        }
                        catch (Exception e) {
                            System.out.println("Error: " + e.getMessage());
                            e.printStackTrace();
                        }
                    }
                });

                //send old messages to user
                try{
                    JSONArray jsonArray = new JSONArray();
                    oldMessages.forEach(message -> jsonArray.put(Json.toJsonObj(message)));
                    socket.send("messages", jsonArray);
                }
                catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                    e.printStackTrace();
                }
                socket.send("message", Json.toJsonObj(ChatMessage.builder().time(Common.convertDateToISOString(new Date())).message("You joined the chat room.").type(MessageType.JOIN).build()));

                //join socket to room and send message to others when new user joined
                socket.joinRoom(req.roomId.toString());
                socket.broadcast(req.roomId.toString(),"message", Json.toJsonObj(ChatMessage.builder().time(Common.convertDateToISOString(new Date())).message(req.sender + " joined the chat room.").type(MessageType.JOIN).build()));
            });

            socket.on("disconnect", args1 -> {
                Integer userId = hmSocketUser.get(socket.getId()).getId();
                String username = hmSocketUser.get(socket.getId()).getUsername();
                Integer roomId = hmSocketRoom.get(socket.getId());

                chatRooms.stream().filter(room -> room.roomId.equals(roomId)).toList().get(0).userIds.remove(userId);
                socket.broadcast(roomId.toString(),"message", Json.toJsonObj(ChatMessage.builder().time(Common.convertDateToISOString(new Date())).message(username + " left the chat room.").type(MessageType.LEAVE).build()));
            });

            socket.on("message", args1 -> {
                try {
                    JSONObject o = (JSONObject) args1[0];
                    ChatMessage chatMessage = Json.toPojoObj(o, ChatMessage.class);
                    Integer roomId = hmSocketRoom.get(socket.getId());

                    //save message to room
                    saveMessage(chatRooms, roomId, chatMessage);
                    socket.broadcast(chatMessage.roomId.toString(),"message", Json.toJsonObj(chatMessage));
                }
                catch (Exception e) {
                    e.printStackTrace();
                }
            });
        });

        return sioServer;
    }

    public void saveMessage(List<ChatRoom> chatRooms, Integer roomId, ChatMessage chatMessage) {
        chatRooms.stream().forEach(room -> {
            if (room.roomId.equals(roomId)) {
                try{
                    List<ChatMessage> newMessages = new ArrayList<>(room.getMessages() == null ? List.of() : room.getMessages());
                    newMessages.add(chatMessage);
                    room.setMessages(newMessages);
                }
                catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        });
    }
}
