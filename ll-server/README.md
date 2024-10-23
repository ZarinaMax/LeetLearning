### Build

#### Step 1: Maven Build
```bash
./mvnw clean package
```
This command cleans the project directory, builds the application from scratch, and packages it into a JAR file.

#### Step 2: Docker Build
```bash
docker build -t spring-boot-app .
```
This command uses the `Dockerfile` in the current directory to build a Docker image. The `-t` flag tags the image with the name `spring-boot-app`.

#### Step 3: Compose Up
```bash
docker-compose up --build
```
This command uses Docker Compose to create and start containers from the images built in previous steps. If the image doesn't exist, it will be rebuilt using the Dockerfile instructions.

Note: This is a three-step process to build and run your Spring Boot application in a containerized environment.
