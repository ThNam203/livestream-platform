package com.example.livestreaming.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomRequestDTO {
    public Integer roomId;
    public String roomName;
    public Integer senderId;
    public String senderName;
}
