package com.foodDelivery.service.interfaces;

import com.foodDelivery.dto.SignUpDto;
import com.foodDelivery.dto.UserJwtResponse;
import com.foodDelivery.dto.UserLoginRequest;
import com.foodDelivery.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;


public interface UserService {

    SignUpDto userRegister(User user) throws MessagingException;
    UserJwtResponse userLogin(UserLoginRequest userLoginRequest);
    String getEmail(String jwt);
    void updateUserVerification(String userId);
    void deleteUser(String userId);
}
