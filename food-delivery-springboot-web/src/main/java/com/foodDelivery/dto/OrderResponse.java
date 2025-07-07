package com.foodDelivery.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrderResponse {

    private String id;
    private String userId;
    private OrderUserDetails userDetails;
    private OrderUserAddress userAddress;
    private List<OrderItem> orderItemList;
    private double amount;
    private String paymentStatus;
    private String razorPayOrderId;
    private String razorPayPaymentId;
    private String orderStatus;
}
