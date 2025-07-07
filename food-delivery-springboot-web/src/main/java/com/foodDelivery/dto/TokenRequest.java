package com.foodDelivery.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TokenRequest {

    private String otp;
    private String userId;
    private LocalDateTime confirmedAt;
}
