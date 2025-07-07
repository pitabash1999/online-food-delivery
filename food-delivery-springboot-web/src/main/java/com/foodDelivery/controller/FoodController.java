package com.foodDelivery.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.foodDelivery.dto.FoodRequest;
import com.foodDelivery.dto.FoodResponse;
import com.foodDelivery.service.interfaces.FoodService;
import lombok.AllArgsConstructor;
import org.bson.json.JsonParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/foods/")
@AllArgsConstructor
public class FoodController {

    private final FoodService foodService;

    @PostMapping("/saveFoodItems")
    public ResponseEntity<?> addFoodItem(
            @RequestPart("foodRequest") String request,
            @RequestPart("file") MultipartFile file){
        try{

            ObjectMapper objectMapper=new ObjectMapper();
            FoodRequest foodRequest=objectMapper.readValue(request,FoodRequest.class);

            FoodResponse foodResponse=foodService.addFoodItem(foodRequest,file);
            return new ResponseEntity<>(foodResponse,HttpStatus.OK);

        }catch (JsonParseException exception){
            return new ResponseEntity<>("Invalid format", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/getAllFoods")
    public ResponseEntity<?> getFoodItems(){

        return new ResponseEntity<>(foodService.getAllFoods(),HttpStatus.OK);
    }


    @GetMapping("/getFoodById/{id}")
    public ResponseEntity<?> getFoodById(@PathVariable String id){

        try{

            FoodResponse foodResponse=foodService.getFoodById(id);
            if(foodResponse==null){
                return ResponseEntity.notFound().build();
            }
            return new ResponseEntity<>(foodResponse,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFoodById(@PathVariable String id){

        try{
            foodService.deleteById(id);
            return new ResponseEntity<>("Item deleted",HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
