package com.foodDelivery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponse {

    private String id;
    private String imageUrl;
    private String name;
    private String description;
    private double price;
    private String category;
}
