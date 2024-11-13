# Use a base image with JDK 17
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container
COPY target/ll-server-3.3.4.jar /app/app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Expose the debug port
EXPOSE 5005

# Run the Spring Boot application
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]