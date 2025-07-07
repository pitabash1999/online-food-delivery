package com.foodDelivery.service.impls;

import com.foodDelivery.config.JwtConfig;
import com.foodDelivery.dto.CartRequest;
import com.foodDelivery.dto.CartResponse;
import com.foodDelivery.entity.Cart;
import com.foodDelivery.entity.User;
import com.foodDelivery.repository.CartRepository;
import com.foodDelivery.repository.UserRepository;
import com.foodDelivery.service.interfaces.CartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private UserRepository userRepository;
    private CartRepository cartRepository;
    private JwtConfig jwtConfig;

    @Override
    public CartResponse addToCart(CartRequest cartRequest,String jwt) {

        try{

            String email=jwtConfig.getUserNameFromJwt(jwt);
            User user=userRepository.findByEmail(email);
            Cart cart
                    =cartRepository.findByUserId(user.getId());
            if(cart==null){
                cart=new Cart();
                Map<String,Integer> map=new HashMap<>();
                map.put(cartRequest.getFoodId(), map.getOrDefault(cartRequest.getFoodId(),0)+1);

                if(cart.getUserId()==null)cart.setUserId(user.getId());
                cart.setMap(map);
            }
            else{
                Map<String,Integer> map=cart.getMap();

                if(map==null){
                    map=new HashMap<>();
                }
                map.put(cartRequest.getFoodId(), map.getOrDefault(cartRequest.getFoodId(),0)+1);

                if(cart.getUserId()==null)cart.setUserId(user.getId());
                cart.setMap(map);
            }


            Cart respCart=cartRepository.save(cart);

            return convertToRespCart(respCart);

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public CartResponse deleteFromCart(CartRequest cartRequest, String jwt) {
        try{

            String email=jwtConfig.getUserNameFromJwt(jwt);
            User user=userRepository.findByEmail(email);
            Cart cart
                    =cartRepository.findByUserId(user.getId());
            if(cart==null){
                cart=new Cart();
                Map<String,Integer> map=new HashMap<>();
                if(cart.getUserId()==null)cart.setUserId(user.getId());
                cart.setMap(map);
            }
            else{
                Map<String,Integer> map=cart.getMap();
                if(!map.isEmpty()){
                    Integer quantity=map.get(cartRequest.getFoodId());
                    if(quantity>1){
                        map.put(cartRequest.getFoodId(), map.get(cartRequest.getFoodId())-1);
                    }else{
                        map.remove(cartRequest.getFoodId());
                    }

                }

                if(cart.getUserId()==null)cart.setUserId(user.getId());
                cart.setMap(map);
            }


            Cart respCart=cartRepository.save(cart);

            return convertToRespCart(respCart);

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public CartResponse getCartFoods(String jwt) {
        try{

            String email=jwtConfig.getUserNameFromJwt(jwt);
            User user=userRepository.findByEmail(email);
            Cart cart =cartRepository.findByUserId(user.getId());
            if(cart==null){
                cart=new Cart();
                Map<String,Integer> map=new HashMap<>();
                if(cart.getUserId()==null)cart.setUserId(user.getId());
                cart.setMap(map);
            }


            return convertToRespCart(cart);

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteFoodFromCart(CartRequest cartRequest, String jwt) {

        try{

            String email=jwtConfig.getUserNameFromJwt(jwt);
            User user=userRepository.findByEmail(email);
            Cart cart =cartRepository.findByUserId(user.getId());
            Map<String,Integer> map = cart.getMap();
            map.remove(cartRequest.getFoodId());
            cart.setMap(map);
            cartRepository.save(cart);


        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    private CartResponse convertToRespCart(Cart respCart) {

        return CartResponse.builder()
                .id(respCart.getId())
                .userId(respCart.getUserId())
                .map(respCart.getMap())
                .build();
    }
}
