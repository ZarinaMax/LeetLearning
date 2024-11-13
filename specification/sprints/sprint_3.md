# Sprint 3: Backend Development & Testing

## Sprint Goals
- Define the API contract for interaction between the frontend (`ll-client`) and backend (`ll-server`).
- Implement and test the backend APIs for user management, task handling, and solution submission.
- Ensure the backend is fully functional and can handle requests from the frontend.

## Detailed Task List and Steps

### Step 1: Define API Contract

#### Task 1.1: Define API Endpoints
- **Description**: Define the API endpoints for user management, task handling, and solution submission.
- **Endpoints**:
  - **User Management**:
    - `POST /api/auth/register`: Register a new user.
    - `POST /api/auth/login`: Login a user.
    - `GET /api/user/me`: Get current user details.
    - `PUT /api/user/me`: Update current user details.
  - **Task Handling**:
    - `GET /api/tasks`: Get a list of tasks.
    - `GET /api/tasks/{taskId}`: Get details of a specific task.
  - **Solution Submission**:
    - `POST /api/attempts`: Submit a solution for a task.

#### Task 1.2: Document API Contract
- **Description**: Create a detailed API documentation using Swagger or OpenAPI.
- **Steps**:
  - Add Swagger/OpenAPI annotations to the controller methods.
  - Generate and review the API documentation.
  - Ensure the documentation is accessible at `/swagger-ui.html`.

### Step 2: Plan Unit Tests for TDD

#### Task 2.1: Plan Unit Tests for User Management
- **Description**: Plan unit tests for the user registration, login, and profile management functionalities.
- **Steps**:
  - Identify test cases for user registration (e.g., successful registration, duplicate username/email).
  - Identify test cases for user login (e.g., successful login, incorrect password).
  - Identify test cases for fetching and updating user details (e.g., successful fetch/update, unauthorized access).

#### Task 2.2: Plan Unit Tests for Task Handling
- **Description**: Plan unit tests for the task retrieval functionalities.
- **Steps**:
  - Identify test cases for fetching tasks (e.g., fetch all tasks, fetch tasks by category).
  - Identify test cases for fetching task details (e.g., fetch task by ID, task not found).

#### Task 2.3: Plan Unit Tests for Solution Submission
- **Description**: Plan unit tests for the solution submission functionalities.
- **Steps**:
  - Identify test cases for submitting solutions (e.g., successful submission, invalid solution format).
  - Identify test cases for solution validation (e.g., correct solution, incorrect solution).

### Step 3: Implement User Management APIs

#### Task 3.1: Implement Registration and Login
- **Description**: Implement the registration and login functionalities using JWT for authentication.
- **Steps**:
  - Create the `AuthController` with endpoints for registration and login.
  - Implement the `UserService` methods for registering and logging in users.
  - Ensure JWT tokens are generated and returned upon successful login.

#### Task 3.2: Implement User Profile Management
- **Description**: Implement the endpoints for fetching and updating user details.
- **Steps**:
  - Create the `UserController` with endpoints for fetching and updating user details.
  - Implement the `UserService` methods for fetching and updating user details.
  - Ensure the endpoints are secured and only accessible to authenticated users.

### Step 4: Implement Task Handling APIs

#### Task 4.1: Implement Task Retrieval
- **Description**: Implement the endpoints for retrieving tasks and task details.
- **Steps**:
  - Create the `TaskController` with endpoints for fetching tasks and task details.
  - Implement the `TaskService` methods for fetching tasks and task details.
  - Ensure the endpoints return the necessary task information, including the `code_template`.

### Step 5: Implement Solution Submission APIs

#### Task 5.1: Implement Solution Submission
- **Description**: Implement the endpoint for submitting solutions for tasks.
- **Steps**:
  - Create the `AttemptController` with an endpoint for submitting solutions.
  - Implement the `AttemptService` methods for handling solution submissions.
  - Ensure the solutions are validated and stored in the database.

### Step 6: Testing and Validation

#### Task 6.1: Unit Testing
- **Description**: Write unit tests for the service methods and controllers.
- **Steps**:
  - Use JUnit and Mockito for writing unit tests.
  - Ensure all service methods and controllers are covered by unit tests.

#### Task 6.2: Integration Testing
- **Description**: Write integration tests for the API endpoints.
- **Steps**:
  - Use Spring Boot Test for writing integration tests.
  - Ensure the API endpoints are tested with various scenarios, including edge cases.

#### Task 6.3: End-to-End Testing
- **Description**: Perform end-to-end testing to ensure the entire system works as expected.
- **Steps**:
  - Use Postman or similar tools for manual testing.
  - Ensure the frontend can interact with the backend and all functionalities work as expected.

### Summary
By following these steps, we will implement and test the backend APIs for user management, task handling, and solution submission. This will ensure the backend is fully functional and can handle requests from the frontend, providing a seamless user experience on the LeetLearning platform. The inclusion of TDD principles will ensure that the code is robust and well-tested from the start.
