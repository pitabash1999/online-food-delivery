package com.foodDelivery.service.impls;

import com.foodDelivery.dto.FoodRequest;
import com.foodDelivery.dto.FoodResponse;
import com.foodDelivery.entity.FoodEntity;
import com.foodDelivery.repository.FoodRepository;
import com.foodDelivery.service.interfaces.FoodService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class FoodServiceImpl implements FoodService {

    private final S3Client s3Client;
    private final FoodRepository foodRepository;

    @Value("${aws.bucket-name}")
    private String bucketName;

    public FoodServiceImpl(S3Client s3Client,
                           FoodRepository foodRepository) {
        this.s3Client = s3Client;
        this.foodRepository=foodRepository;
    }

    @Override
    public String uploadFile(MultipartFile file) {

        try {
            String fileExtension= Objects.requireNonNull(file
                            .getOriginalFilename())
                    .substring(file.getOriginalFilename().lastIndexOf(".")+1);
            String key= UUID.randomUUID().toString()+"."+fileExtension;

            PutObjectRequest putObjectRequest=PutObjectRequest.builder()
                    .bucket(bucketName) //give the bucket name
                    .key(key)           //key we have generated
                    .acl("public-read")//access control to the bucket
                    .contentType(file.getContentType())
                    .build();

            PutObjectResponse putObjectResponse=s3Client.
                    putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

            if(putObjectResponse.sdkHttpResponse().isSuccessful()){
                return "https://"+bucketName+".s3.amazonaws.com/"+key;
            }else{
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Unable to upload file");
            }

        }catch (Exception ignored){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error in uploading file");
        }

    }

    @Override
    public FoodResponse addFoodItem(FoodRequest foodRequest,MultipartFile file) {

        FoodEntity foodEntity=convertToEntity(foodRequest);
        foodEntity.setImageUrl(uploadFile(file));
        FoodEntity foodEntityResponse = foodRepository.save(foodEntity);
        return convertToResponse(foodEntityResponse);
    }

    @Override
    public List<FoodResponse> getAllFoods() {

        return foodRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public FoodResponse getFoodById(String id) {

        FoodEntity foodEntity=foodRepository.findById(id).orElseThrow(()->new RuntimeException("Item not found with this id :"+id));
        return convertToResponse(foodEntity);
    }

    @Override
    public boolean deleteImageFromS3(String image) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                .builder()
                        .bucket(bucketName)
                                .key(image)
                                        .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void deleteById(String id) {

        FoodResponse foodResponse=getFoodById(id);
        String imageUrl=foodResponse.getImageUrl();
        String image=imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        boolean isDeleted=deleteImageFromS3(image);
        if(isDeleted){
            foodRepository.deleteById(id);
        }

    }

    private FoodEntity convertToEntity(FoodRequest foodRequest){

        return FoodEntity.builder()
                .name(foodRequest.getName().trim())
                .category(foodRequest.getCategory().trim())
                .description(foodRequest.getDescription() != null ?
                        foodRequest.getDescription().trim() : null)
                .price(foodRequest.getPrice())
                .build();
    }

    private FoodResponse convertToResponse(FoodEntity entity){

        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
