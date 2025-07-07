package com.foodDelivery.controller;


import com.foodDelivery.dto.OrderRequest;
import com.foodDelivery.dto.OrderResponse;
import com.foodDelivery.service.interfaces.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/createOrder")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest,
                                         @RequestHeader("Authorization") String jwt){

        try {

            return new ResponseEntity<>(orderService.placeOrder(orderRequest,jwt),HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String ,String> paymentDetails){

        try{

            OrderResponse orderResponse=orderService.verifyPayment(paymentDetails,"paid");
            return new ResponseEntity<>(orderResponse,HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.FORBIDDEN);
        }
    }

    //admin
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllOrders")
    public ResponseEntity<?> getAllOrders(){

        try{
            return new ResponseEntity<>(orderService.getAllOrders(),HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAllOrdersById")
    public ResponseEntity<?> getAllOrdersUserId(@RequestHeader("Authorization") String jwt){

        try{

            return new ResponseEntity<>(orderService.getAllOrderByUserId(jwt),HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> removeOrder(@PathVariable String orderId){

        return new ResponseEntity<>("Order cancelled",HttpStatus.OK);
    }

    //admin
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/updateStatus/{orderId}")
    public ResponseEntity<?> updateStatus(@PathVariable String orderId,
                                          @RequestParam String status){

        try{

            orderService.updateOrderStatus(orderId,status);
            return new ResponseEntity<>("status updated",HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }


}
