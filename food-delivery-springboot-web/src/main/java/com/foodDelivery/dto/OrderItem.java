package com.foodDelivery.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {

    private String foodId;
    private Integer quantity;
    private String name;
    private String category;
    private String imageUrl;
    private double price;
}
