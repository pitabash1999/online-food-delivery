package com.foodDelivery.service.impls;

import com.foodDelivery.config.JwtConfig;
import com.foodDelivery.dto.SignUpDto;
import com.foodDelivery.dto.UserJwtResponse;
import com.foodDelivery.dto.UserLoginRequest;
import com.foodDelivery.entity.Token;
import com.foodDelivery.entity.User;
import com.foodDelivery.repository.UserRepository;
import com.foodDelivery.service.interfaces.TokenService;
import com.foodDelivery.service.interfaces.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtConfig jwtConfig;
    @Autowired
    @Lazy
    private TokenService tokenService;
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${email.user}")
    private String sendToMail;

    @Override
    public SignUpDto userRegister(User user) throws MessagingException {

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        if(user.getRole().equals("ROLE_ADMIN")){
            User userAdmin=userRepository.save(user);
            String otp=generateOtp();
            Token token=new Token();
            token.setUserId(userAdmin.getId());
            token.setOtp(otp);
            token.setCreatedAt(LocalDateTime.now());
            token.setExpiresAt(LocalDateTime.now().plusMinutes(5));
            tokenService.savaToken(token);
            sendHtmlOtpEmail(otp,sendToMail!=null?sendToMail:userAdmin.getEmail());
            return convetoToSignUpDto(userAdmin);
        }

        User user1 = userRepository.save(user);
        return convetoToSignUpDto(user1);
    }

    private String generateOtp() {

        SecureRandom secureRandom=new SecureRandom();
        int otp=100_000 + secureRandom.nextInt(900_000);
        return String.valueOf(otp);
    }

    @Async
    public void sendHtmlOtpEmail(String otp,String email) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Your OTP Code from food delivery service");

        String htmlContent = "<h1>Your OTP is: " + otp + "</h1><p>It will expire in 5 minutes.</p>";
        helper.setText(htmlContent, true);

        javaMailSender.send(message);
    }


    @Override
    public UserJwtResponse userLogin(UserLoginRequest userLoginRequest) {

        try{

            Authentication authentication=authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(userLoginRequest.getEmail(),userLoginRequest.getPassword()));
            if(!authentication.isAuthenticated()){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"User not found with this "+userLoginRequest.getEmail());

            }

            User user=userRepository.findByEmail(userLoginRequest.getEmail());
            String jwtToken= jwtConfig.generateToken(userLoginRequest,user.getRole());


            return new UserJwtResponse(jwtToken);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Invalid credentials");
        }


    }

    @Override
    public String getEmail(String jwt) {

        try{
            return jwtConfig.getUserNameFromJwt(jwt);
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateUserVerification(String userId) {

        Optional<User> user=userRepository.findById(userId);
        if(user.isPresent()){
            user.get().setVerified(true);
            userRepository.save(user.get());
        }
    }

    @Override
    public void deleteUser(String userId) {

        userRepository.deleteById(userId);
    }

    private SignUpDto convetoToSignUpDto(User user1) {

        return SignUpDto.builder()
                .id(user1.getId())
                .name(user1.getName())
                .email(user1.getEmail())
                .role(user1.getRole())
                .build();
    }
}
