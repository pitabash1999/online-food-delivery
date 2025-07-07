package com.foodDelivery.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private OrderUserDetails userDetails;
    private OrderUserAddress userAddress;
    private List<OrderItem> orderItemList;
    private double amount;

}
