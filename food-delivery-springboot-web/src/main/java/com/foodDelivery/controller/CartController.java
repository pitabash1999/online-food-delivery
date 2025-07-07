package com.foodDelivery.controller;

import com.foodDelivery.dto.CartRequest;
import com.foodDelivery.entity.Cart;
import com.foodDelivery.service.interfaces.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/addFoodToCart")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest foodId,
                                       @RequestHeader("Authorization") String jwt){

        try{

            return new ResponseEntity<>(cartService.addToCart(foodId,jwt), HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/deleteFoodToCart")
    public ResponseEntity<?> deleteFromCart(@RequestBody CartRequest foodId,
                                       @RequestHeader("Authorization") String jwt){

        try{

            return new ResponseEntity<>(cartService.deleteFromCart(foodId,jwt), HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/deleteFoodFromCart")
    public ResponseEntity<?> deleteFoodFromCart(@RequestBody CartRequest cartRequest,
                                                @RequestHeader("Authorization") String jwt){

        try{

            cartService.deleteFoodFromCart(cartRequest,jwt);
            return new ResponseEntity<>("Food deleted from cart",HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }

    }

    @GetMapping("/getFromCart")
    public ResponseEntity<?> getAllFromCart(
                                            @RequestHeader("Authorization") String jwt){

        try{

            return new ResponseEntity<>(cartService.getCartFoods(jwt), HttpStatus.OK);

        } catch (RuntimeException e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
