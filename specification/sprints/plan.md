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

## Sprint 4: Solution Runner Development & Testing

### Sprint Goals
- Build the solution runner (`ll-solution-runner`) using Python.
- Set up Docker-based isolation for executing user-submitted code.
- Test the solution runner independently with test cases.

## Sprint 5: Full System Integration & Final Build

### Sprint Goals
- Integrate all modules (frontend, backend, solution runner).
- Ensure the entire system works cohesively, from user login to solution submission and evaluation.
- Prepare a stable, deployable build.
