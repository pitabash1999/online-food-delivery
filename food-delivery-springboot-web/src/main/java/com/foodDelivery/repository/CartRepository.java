package com.foodDelivery.repository;

import com.foodDelivery.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart,String> {

    Cart findByUserId(String userId);
    void deleteByUserId(String userId);
}
