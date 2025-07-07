package com.foodDelivery.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderUserDetails {

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
