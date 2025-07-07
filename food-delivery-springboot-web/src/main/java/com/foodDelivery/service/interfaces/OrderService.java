package com.foodDelivery.service.interfaces;

import com.foodDelivery.dto.OrderRequest;
import com.foodDelivery.dto.OrderResponse;

import java.util.List;
import java.util.Map;

public interface OrderService {

    OrderResponse placeOrder(OrderRequest orderRequest,String jwt);
    OrderResponse verifyPayment(Map<String,String> paymentDetails,String status);
    List<OrderResponse> getAllOrders();
    List<OrderResponse> getAllOrderByUserId(String jwt);
    void removeOrder(String id);
    void updateOrderStatus(String id,String status);

}
