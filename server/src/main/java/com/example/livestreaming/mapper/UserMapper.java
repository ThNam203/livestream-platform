package com.example.livestreaming.mapper;

import com.example.livestreaming.entity.User;
import com.example.livestreaming.payload.UserDTO;

public class UserMapper {
    public static UserDTO toUserDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .birth(user.getBirth())
                .password(user.getPassword())
                .email(user.getEmail())
                .build();
    }

    public static User toUser(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .username(userDTO.getUsername())
                .birth(userDTO.getBirth())
                .password(userDTO.getPassword())
                .email(userDTO.getEmail())
                .build();
    }

}
