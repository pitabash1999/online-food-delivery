package com.foodDelivery.controller;

import com.foodDelivery.dto.TokenRequest;
import com.foodDelivery.dto.UserJwtResponse;
import com.foodDelivery.dto.UserLoginRequest;
import com.foodDelivery.entity.User;
import com.foodDelivery.service.interfaces.TokenService;
import com.foodDelivery.service.interfaces.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private TokenService tokenService;

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@RequestBody User user){

        try{
            user.setVerified(true);
            user.setRole("ROLE_USER");
            return new ResponseEntity<>(userService.userRegister(user),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/admin/signUp")
    public ResponseEntity<?> adminSignUp(@RequestBody User user){

        try{
            user.setRole("ROLE_ADMIN");
            return new ResponseEntity<>(userService.userRegister(user),HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/admin/signUpVerification")
    public ResponseEntity<?> verifyAdminSignUp(@RequestBody TokenRequest otp){

        try{
            otp.setConfirmedAt(LocalDateTime.now());
            return new ResponseEntity<>(tokenService.isTokenVerified(otp),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("delete/{userId}")
    public ResponseEntity<?> deleteUserById(@PathVariable String userId){

        try{
            userService.deleteUser(userId);
            return new ResponseEntity<>("User deleted",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }




    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody UserLoginRequest user){

        try{

            UserJwtResponse userJwtResponse=userService.userLogin(user);
            return new ResponseEntity<>(userJwtResponse,HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getEmail")
    public ResponseEntity<?> userEmail(@RequestHeader("Authorization") String jwt){

        try{

            return new ResponseEntity<>(userService.getEmail(jwt),HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(e.getMessage(),HttpStatus.UNAUTHORIZED);
        }
    }


}
