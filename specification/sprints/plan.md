# LeetLearning Project Plan

## Sprint 1: Analysis & Decomposition

### Sprint Goals
- Define and describe the project structure.
- Define the data model.
- Define the solution submission and execution model.
- Set up and build the backend application.
- Create a draft for solution testing.

### Task List
1. **Project Idea Development**  
   Define the main functionality of the LeetLearning platform.
   
2. **Project Breakdown into 3 Modules**  
   Identify the main parts: frontend (`ll-client`), backend (`ll-server`), and solution execution service (`ll-solution-runner`).
   
3. **Choosing Technology Stack for Each Module**  
   Research and select appropriate technologies.
   
4. **Functional Description for Each Module**  
   Provide detailed descriptions of user scenarios and requirements.
   
5. **Data Model Development for PostgreSQL**  
   Develop the database structure (tables: User, Task, Test, Attempt, etc.).
   
6. **Set Up ll-server and Build with Docker Compose**  
   Install and configure `ll-server` using Docker.
   
7. **Add User Authorization Logic to ll-server**  
   Implement JWT-based authentication.
   
8. **Draft for Solution Execution in ll-solution-runner**  
   Develop a basic concept and testing process for isolated code execution.
   
9. **API Contract for ll-server and ll-solution-runner**  
   Define API endpoints and data exchange methods between the server and runner.
   
10. **Develop a 5-Sprint Plan**  
   Outline tasks and goals for the following sprints.

---

## Sprint 2: Web Client Development & Testing

### Sprint Goals
- Build the frontend (`ll-client`) of the application using React.
- Implement basic features like user registration, login, task catalog, and a code editor.
- Test the frontend application independently with mock data.

### Task List
1. **Set Up Frontend (ll-client)**  
   Initialize a React project and set up essential tools and libraries (Material-UI, Tailwind CSS, Monaco Editor, Axios).
   
2. **Implement User Registration and Login**  
   Create forms for registration and login, and integrate JWT token handling for secure sessions.
   
3. **Build User Dashboard**  
   Create a user dashboard showing progress, statistics, and access to account settings.
   
4. **Create Task Catalog UI**  
   Implement a task catalog with categories (regression, classification, clustering) and search/filter features.
   
5. **Implement Interactive Code Editor**  
   Integrate Monaco Editor for in-browser coding with syntax highlighting and autocompletion.
   
6. **Connect to Mock Backend**  
   Use mock APIs or local storage to simulate server interactions for registration, login, task fetching, and solution submission.
   
7. **Test Frontend Functionality**  
   Ensure all features (login, task catalog, code editor) work independently and provide a seamless user experience.

---

## Sprint 3: Backend Development & Testing

### Sprint Goals
- Build the backend (`ll-server`) and set up the database.
- Implement APIs for user management, task handling, and solution submission.
- Test the backend independently with unit tests and mock frontend calls.

### Task List
1. **Set Up Backend (ll-server)**  
   Create a Spring Boot application and configure Docker for environment management.
   
2. **Implement User Authentication**  
   Finalize JWT-based user registration and login APIs with Spring Security.
   
3. **Task and Test Management**  
   Implement CRUD operations for tasks and tests (create, fetch, update, delete).
   
4. **Solution Submission Logic**  
   Develop APIs for receiving, storing, and validating user-submitted solutions.
   
5. **Database Configuration**  
   Finalize PostgreSQL integration with Spring Data JPA. Create tables and relationships (User, Task, Test, Attempt).
   
6. **Implement Solution Evaluation Process**  
   Set up logic to evaluate user submissions based on expected outputs (prepare mock data for testing).
   
7. **Test Backend Functionality**  
   Write unit and integration tests for each API, including user registration, task retrieval, and solution submission.
   
8. **API Documentation**  
   Document backend APIs (e.g., using Swagger) to simplify future integrations.

---

## Sprint 4: Solution Runner Development & Testing

### Sprint Goals
- Build the solution runner (`ll-solution-runner`) using Python.
- Set up Docker-based isolation for executing user-submitted code.
- Test the solution runner independently with test cases.

### Task List
1. **Set Up Solution Runner (ll-solution-runner)**  
   Initialize the Python project and configure Flask (or alternative) for a REST API.
   
2. **Implement Docker-Based Isolation**  
   Set up Docker containers to execute user code with time and memory limits.
   
3. **Code Execution Logic**  
   Develop logic for running user-submitted code, capturing output, and comparing results with expected values.
   
4. **Create Test Cases for Solution Evaluation**  
   Write test cases to simulate user-submitted code (including edge cases and invalid submissions).
   
5. **API for Communication with ll-server**  
   Implement endpoints to receive solutions, execute them, and return results to `ll-server`.
   
6. **Container Management with Docker Compose**  
   Use Docker Compose to manage solution execution and dependencies.
   
7. **Testing the Solution Runner**  
   Test solution execution with different Python code snippets and ensure isolation, time, and memory limits are working.
   
8. **Log Execution Results**  
   Set up logging for code execution results, including success, failure, and error messages.

---

## Sprint 5: Full System Integration & Final Build

### Sprint Goals
- Integrate all modules (frontend, backend, solution runner).
- Ensure the entire system works cohesively, from user login to solution submission and evaluation.
- Prepare a stable, deployable build.

### Task List
1. **Frontend-Backend Integration**  
   Connect the React frontend (`ll-client`) with the Spring Boot backend (`ll-server`).
   
2. **Backend-Solution Runner Integration**  
   Finalize the interaction between `ll-server` and `ll-solution-runner` for handling solution submissions.
   
3. **End-to-End Testing**  
   Test the entire system, from user registration to task selection, code submission, and solution evaluation.
   
4. **Bug Fixes and Optimization**  
   Fix any bugs found during integration and optimize performance (e.g., reduce execution time, minimize API calls).
   
5. **Deployment Preparation**  
   Ensure all modules are Dockerized and can be deployed using Docker Compose.
   
6. **Create a CI/CD Pipeline**  
   Set up automated tests and continuous integration for the project to ensure future stability.
   
7. **Final Testing and Stable Build**  
   Perform final system tests, prepare documentation, and finalize the stable build of the project.
