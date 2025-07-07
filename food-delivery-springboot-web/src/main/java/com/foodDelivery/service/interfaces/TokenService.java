package com.foodDelivery.service.interfaces;

import com.foodDelivery.dto.TokenRequest;
import com.foodDelivery.entity.Token;

public interface TokenService {

    boolean isTokenVerified(TokenRequest otp);
    Token savaToken(Token token);
}
