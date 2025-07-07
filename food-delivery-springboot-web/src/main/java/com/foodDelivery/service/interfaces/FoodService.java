package com.foodDelivery.service.interfaces;

import com.foodDelivery.dto.FoodRequest;
import com.foodDelivery.dto.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);
    FoodResponse addFoodItem(FoodRequest foodRequest,MultipartFile file);
    List<FoodResponse> getAllFoods();
    FoodResponse getFoodById(String id);
    boolean deleteImageFromS3(String image);
    void deleteById(String id);
}
