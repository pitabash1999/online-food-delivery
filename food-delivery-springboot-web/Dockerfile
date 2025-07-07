# Use the official Maven image to build the app
# This stage will handle the compilation and packaging of your Spring Boot application
FROM maven:3.9.8-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file to the working directory
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code of your application to the working directory
COPY src ./src

# Package the application, skipping tests to speed up the build process
RUN mvn clean package -DskipTests

# Use the official OpenJDK image to run the app
# This stage will use the compiled and packaged application from the previous stage
FROM openjdk:21-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the build stage to the current working directory
COPY --from=build /app/target/food-delivery-springboot-web-0.0.1-SNAPSHOT.jar .

EXPOSE 8090

# Define the entry point for the Docker container to run the application
ENTRYPOINT ["java", "-jar", "food-delivery-springboot-web-0.0.1-SNAPSHOT.jar"]