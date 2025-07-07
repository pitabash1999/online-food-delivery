package com.foodDelivery.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderUserAddress {

    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;

}
