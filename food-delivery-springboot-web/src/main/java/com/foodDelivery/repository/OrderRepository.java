package com.foodDelivery.repository;

import com.foodDelivery.entity.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Orders,String> {

    Orders findByRazorPayOrderId(String razorPayOrderId);
    List<Orders> findAllByUserId(String userId);
}
