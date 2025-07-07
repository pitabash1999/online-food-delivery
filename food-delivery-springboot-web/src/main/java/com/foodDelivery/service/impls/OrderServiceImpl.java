package com.foodDelivery.service.impls;


import com.foodDelivery.config.JwtConfig;
import com.foodDelivery.dto.OrderRequest;
import com.foodDelivery.dto.OrderResponse;
import com.foodDelivery.entity.Orders;
import com.foodDelivery.entity.User;
import com.foodDelivery.repository.CartRepository;
import com.foodDelivery.repository.OrderRepository;
import com.foodDelivery.repository.UserRepository;
import com.foodDelivery.service.interfaces.OrderService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtConfig jwtConfig;

    @Autowired
    private CartRepository cartRepository;

    @Value("${razorPay.key}")
    private String razorPayKey;
    @Value("${razorPay.secretKey}")
    private String razorPaySecreteKey;


    @Override
    public OrderResponse placeOrder(OrderRequest orderRequest,String jwt) {

        try{
            String email=jwtConfig.getUserNameFromJwt(jwt);
            User user = userRepository.findByEmail(email);
            Orders orders=convertToOrder(orderRequest,user.getId());

            //RazorPay
            RazorpayClient razorpayClient=new RazorpayClient(razorPayKey,razorPaySecreteKey);
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("amount",orders.getAmount()*100);
            jsonObject.put("currency","INR");
            jsonObject.put("payment_capture",1);

            Order order = razorpayClient.orders.create(jsonObject);
            orders.setRazorPayOrderId(order.get("id"));
            orders=orderRepository.save(orders);

            return convertToOrderResponse(orders);
        } catch (RuntimeException | RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public OrderResponse verifyPayment(Map<String, String> paymentDetails, String status) {

        try{

            String razorPayOrderId=paymentDetails.get("razorpay_order_id");
            Orders orders=orderRepository.findByRazorPayOrderId(razorPayOrderId);
            if(orders==null){
                throw new RuntimeException("Order not fount");
            }

            orders.setPaymentStatus(status);
            orders.setRazorpayPaymentId(paymentDetails.get("razorpay_payment_id"));
            orders.setRazorPaySign(paymentDetails.get("razorpay_signature"));

            if("paid".equalsIgnoreCase(status)){
                cartRepository.deleteByUserId(orders.getUserId());
            }

            return convertToOrderResponse(orderRepository.save(orders));

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(this::convertToOrderResponse)
                .toList();
    }

    @Override
    public List<OrderResponse> getAllOrderByUserId(String jwt) {

        String email=jwtConfig.getUserNameFromJwt(jwt);
        User user = userRepository.findByEmail(email);

        return orderRepository.findAllByUserId(user.getId())
                .stream()
                .map(this::convertToOrderResponse)
                .toList();

    }

    @Override
    public void removeOrder(String id) {
        orderRepository.deleteById(id);
    }

    @Override
    public void updateOrderStatus(String id,String status) {

        Optional<Orders> orders= Optional.ofNullable(orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found ")));

        if(orders.isPresent()){
            orders.get().setOrderStatus(status);
            orderRepository.save(orders.get());
        }

    }

    private OrderResponse convertToOrderResponse(Orders orders) {

        return OrderResponse.builder()
                .id(orders.getId())
                .userId(orders.getUserId())
                .userAddress(orders.getUserAddress())
                .userDetails(orders.getUserDetails())
                .orderStatus(orders.getOrderStatus())
                .amount(orders.getAmount())
                .razorPayOrderId(orders.getRazorPayOrderId())
                .paymentStatus(orders.getPaymentStatus())
                .orderItemList(orders.getList())
                .razorPayPaymentId(orders.getRazorpayPaymentId())
                .build();
    }

    private Orders convertToOrder(OrderRequest orderRequest,String id) {

        return Orders.builder()
                .userId(id)
                .userAddress(orderRequest.getUserAddress())
                .userDetails(orderRequest.getUserDetails())
                .amount(orderRequest.getAmount())
                .list(orderRequest.getOrderItemList())
                .build();
    }
}
