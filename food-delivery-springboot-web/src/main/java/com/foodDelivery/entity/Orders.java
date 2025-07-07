package com.foodDelivery.entity;

import com.foodDelivery.dto.OrderItem;
import com.foodDelivery.dto.OrderUserAddress;
import com.foodDelivery.dto.OrderUserDetails;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "orders")
public class Orders {

    @Id
    private String id;
    private String userId;
    private OrderUserDetails userDetails;
    private OrderUserAddress userAddress;
    private List<OrderItem> list;
    private double amount;
    private String paymentStatus="unpaid";
    private String razorPayOrderId;
    private String razorPaySign;
    private String razorpayPaymentId;
    private String orderStatus="Preparing";

}
