### Backend: ll-server

#### Overview

The backend of the LeetLearning platform is implemented as an application in Java 17 using Spring Boot, which ensures high performance and scalability. The application is organized as a container using Docker Compose, allowing for easy integration with a PostgreSQL database and simplifying deployment.

#### Key Features

##### Docker Compose:
- Wraps the Spring Boot application and PostgreSQL in containers, providing environment isolation and simplifying dependency and configuration management.

##### Interaction with Web Client:
- Utilizes Spring MVC to handle HTTP requests from the client, providing a RESTful API for all platform functions.

##### User Account Management:
- Implements login and registration mechanisms using JWT (JSON Web Tokens) for authentication and Spring Security to ensure user data security.

##### Database Management:
- Uses PostgreSQL to store data about users, tasks, tests, and user solution history. Access to the database is handled through Spring Data JPA, simplifying the work with entities and queries.

##### Solution Evaluation Logic:
- Includes algorithms for evaluating user solutions based on predefined criteria, such as correctness, execution speed, and solution optimality. It generates user rankings, allowing for the tracking of their achievements.

##### Integration with Solution Runner:
- Sends user solution attempts to the solution runner, which executes the code and returns results. After code execution, the backend saves the results in the database for further analysis and display to users.

##### Technology Stack
- **Programming Language**: Java 17
- **Framework**: Spring Boot
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security, JWT for authentication
- **Containerization**: Docker and Docker Compose
- **Interface**: Spring MVC for building RESTful APIs