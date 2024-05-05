"use client";
import { IconButton, TextButton } from "@/components/buttons";
import {
  StreamingFrame,
  VideoInfo,
} from "@/components/custom_react_player/streaming_frame";
import { InputWithIcon } from "@/components/input";
import { LivestreamChatMessage } from "@/components/livestreaming/chat_message";
import { showErrorToast } from "@/components/toast";
import { ChatMessageProps } from "@/entities/chatMessage";
import { User } from "@/entities/user";
import { useAppSelector } from "@/redux/hooks";
import { setProfile } from "@/redux/slices/profile";
import UserService from "@/services/userService";
import socket from "@/socket";
import { socket_chat } from "@/socket_chat";
import { getCookie } from "cookies-next";
import { Smile } from "lucide-react";
import { useEffect, useState } from "react";

export default function Livestreaming() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [mixedStream, setMixedStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  //chat socket
  const [chatMesssages, setChatMessages] = useState<ChatMessageProps[]>([]);
  const [timeOnVideo, setTime] = useState(new Date());
  const [chatMessage, setChatMessage] = useState("");
  const [thisUser, setThisUser] = useState<User | null>(
    useAppSelector((state) => state.profile.user)
  );

  // useEffect(() => {
  //   function onConnect() {
  //     console.log("connected");
  //   }

  //   function onDisconnect() {
  //     console.log("disconnected");
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //   };
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      await UserService.getInfo()
        .then((res) => {
          setProfile(res.data);
          setThisUser(res.data);
        })
        .catch((err) => showErrorToast(err));
    };
    fetchData();
    console.log("render");
  }, []);

  useEffect(() => {
    if (!thisUser) return;
    socket_chat.on("connect", () => {
      console.log("connected");
    });

    const isStream = getCookie("goStreaming") === "true" ? true : false;
    console.log("isStream: ", isStream);
    if (isStream) {
      socket_chat.emit("create", {
        roomId: 1,
        roomName: "Livestream title",
        senderId: thisUser.id,
        senderName: thisUser.username,
      });
    } else {
      socket_chat.emit("join", {
        roomId: 1,
        senderId: thisUser.id,
        sender: thisUser.username,
      });
    }

    socket_chat.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      socket_chat.off("connect");
      socket_chat.off("disconnect");
      socket_chat.off("message");
    };
  }, [thisUser]);

  socket_chat.on("message", (mes: any) => {
    const newMessage: ChatMessageProps = {
      roomId: mes.roomId,
      sender: mes.sender,
      message: mes.message,
      time: mes.time,
      type: mes.type,
    };

    console.log("newMessage: ", newMessage);
    addMessage(newMessage);
  });

  socket_chat.on("messages", (messages: any) => {
    const newMessages: ChatMessageProps[] = messages.map((mes: any) => ({
      roomId: mes.roomId,
      sender: mes.sender,
      message: mes.message,
      time: mes.time,
      type: mes.type,
    }));

    console.log("newMessages: ", newMessages);

    addMessages(newMessages);
  });

  useEffect(() => {
    console.log("chatMessage: ", chatMesssages);
  }, [chatMesssages]);

  const setupStreams = async () => {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
        sampleRate: 44100,
      },
    });

    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
        sampleRate: 44100,
      },
    });

    videoStream.getVideoTracks()[0].onended = () => {
      alert("Your screen sharing has ended");
      setVideoStream(null);
      setMicStream(null);
      setMixedStream(null);

      if (recorder) {
        recorder.stop();
        setRecorder(null);
      }
    };

    setVideoStream(videoStream);
    setMicStream(micStream);
  };

  useEffect(() => {
    if (videoStream && micStream) {
      const mixedStream = new MediaStream([
        ...videoStream.getTracks(),
        ...micStream.getTracks(),
      ]);

      const recorder = new MediaRecorder(mixedStream, {
        mimeType: "video/webm",
      });

      socket.emit("config_rtmpDestination", "rtmp://10.0.188.191/live/nam");
      socket.emit("start", "start");

      recorder.ondataavailable = (event) => {
        socket.emit("binarystream", event.data);
      };

      recorder.start(200);
      setRecorder(recorder);
      setMixedStream(mixedStream);
    }
  }, [videoStream, micStream]);

  const startRecording = () => {
    setupStreams();
  };

  const videoInfo: VideoInfo = {
    videoTitle: "Live Streaming",
    streamer: {
      name: "Streamer",
    },
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };

  const onVideoPlay = (currentTime: number) => {};

  const addMessage = (message: ChatMessageProps) => {
    setChatMessages([...chatMesssages, message]);
  };

  const addMessages = (messages: ChatMessageProps[]) => {
    setChatMessages([...chatMesssages, ...messages]);
  };

  const handleSendMessage = () => {
    const newMessage: ChatMessageProps = {
      roomId: 1,
      sender: thisUser ? thisUser.username : "Anonymous",
      message: chatMessage,
      time: new Date().toISOString(),
      type: "CHAT",
    };
    addMessage(newMessage);
    socket_chat.emit("message", newMessage);
    setChatMessage("");
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <StreamingFrame videoInfo={videoInfo} className="w-[calc(100%-400px)]" />
      <div className="fixed top-12 right-0 bottom-0 w-[400px] font-sans border-l flex flex-col justify-between">
        <div className="w-full flex flex-row justify-center mx-2 py-4 border-y">
          <span className="font-semibold text-primaryWord">STREAM CHAT</span>
        </div>
        <div className="max-h-3/4 flex-1 flex-col items-start justify-start px-2 py-2 space-y-2 overflow-y-scroll">
          {chatMesssages.map((message, index) => (
            <LivestreamChatMessage
              key={index}
              time={new Date(message.time)}
              message={message.message}
              sender={message.sender}
              type={message.type}
            />
          ))}
        </div>
        <div className="w-full flex flex-col px-2">
          <InputWithIcon
            className="py-2"
            placeholder="Send your message"
            iconAfter={<IconButton icon={<Smile size={24} />} />}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />

          <div className="flex flex-row justify-end py-2">
            <TextButton
              className="px-4 text-sm bg-primary text-white hover:bg-secondary ease-linear duration-100"
              content="Chat"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
