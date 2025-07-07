package com.foodDelivery.config;

import com.foodDelivery.repository.TokenRepository;
import com.foodDelivery.service.impls.TokenServiceImpl;
import com.foodDelivery.service.impls.UserServiceImpl;
import com.foodDelivery.service.interfaces.TokenService;
import com.foodDelivery.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Autowired
    private TokenRepository tokenRepository;


    @Bean
    public TokenService tokenService(){

        return new TokenServiceImpl(tokenRepository);
    }

    @Bean
    public UserService userService(){
        return new UserServiceImpl();
    }

}
