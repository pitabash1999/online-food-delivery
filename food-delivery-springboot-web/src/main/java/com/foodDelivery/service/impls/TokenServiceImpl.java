package com.foodDelivery.service.impls;

import com.foodDelivery.dto.TokenRequest;
import com.foodDelivery.entity.Token;
import com.foodDelivery.repository.TokenRepository;
import com.foodDelivery.service.interfaces.TokenService;
import com.foodDelivery.service.interfaces.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@NoArgsConstructor
public class TokenServiceImpl implements TokenService {


    private TokenRepository tokenRepository;
    @Autowired
    @Lazy
    private UserService userService;
    public TokenServiceImpl(TokenRepository tokenRepository){
        this.tokenRepository=tokenRepository;
    }


    @Override
    public boolean isTokenVerified(TokenRequest otp) {

        Optional<Token> token = Optional.ofNullable(tokenRepository.findByUserId(otp.getUserId())
                .orElseThrow(() -> new RuntimeException("Please try to register again")));

        if(token.isPresent()){

            if(!token.get().getOtp().equals(otp.getOtp())){

                throw new RuntimeException("OTP is not matching");

            }else if(!token.get().getExpiresAt().isAfter(otp.getConfirmedAt())){
                throw new RuntimeException("OTP is expired or is not matching");
            }else{
                userService.updateUserVerification(token.get().getUserId());
                tokenRepository.deleteById(token.get().getId());
                return true;
            }
        }


        return false;
    }

    @Override
    public Token savaToken(Token token) {

        return tokenRepository.save(token);
    }
}
