package com.foodDelivery.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("tokens")
public class Token {

    private String id;
    private String otp;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private LocalDateTime conformedAt;
    private String userId;

}
