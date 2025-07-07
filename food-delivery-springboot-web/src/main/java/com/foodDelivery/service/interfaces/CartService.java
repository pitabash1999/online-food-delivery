package com.foodDelivery.service.interfaces;

import com.foodDelivery.dto.CartRequest;
import com.foodDelivery.dto.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest cartRequest,String jwt);
    CartResponse deleteFromCart(CartRequest cartRequest,String jwt);
    CartResponse getCartFoods(String jwt);
    void deleteFoodFromCart(CartRequest cartRequest,String jwt);
}
