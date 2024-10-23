# LeetLearning: Online Machine Learning Platform

## Overview

LeetLearning is an online platform designed to provide an interactive environment for practicing and mastering machine learning and coding skills through structured tasks, challenges, and problem-solving exercises. Inspired by coding challenge platforms like LeetCode, but with a focus on data science, artificial intelligence, and machine learning, LeetLearning allows users to test their solutions by submitting Python code that is executed in secure, isolated environments.

## Features

* **Structured Tasks**: A wide range of machine learning and coding tasks with varying levels of difficulty, categorized into topics such as regression, classification, clustering, and more.
* **Challenges**: Regular challenges with specific themes or topics, designed to test users' skills and knowledge in a particular area.
* **Problem-Solving Exercises**: Interactive exercises that allow users to practice solving machine learning problems step-by-step.
* **User Accounts**: Users can create accounts, log in, and track their progress, leaderboards, and statistics.
* **Leaderboards**: A ranking system that shows the top-performing users for each task or challenge.

## Modules

### Frontend: ll-client

#### Overview
Web frontend client of the LeetLearning platform provide UI features and API integration with ll-server.

#### Technology Stack
- **Programming Language**: JavaScript
- **Framework**: React
- **UI Libraries**:
  - Material-UI
  - Tailwind CSS
- **Code Editor**: Monaco Editor
- **HTTP Client**: Axios

### Backend: ll-server

#### Overview

The backend of the LeetLearning platform in Java 17 and Spring Framework, used to store user and tasks data, provided REST api for task submitions and run it by ll-solution-runner.

##### Technology Stack
- **Programming Language**: Java 17
- **Framework**: Spring Boot
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security, JWT for authentication
- **Containerization**: Docker and Docker Compose
- **Interface**: Spring MVC for building RESTful APIs

### Solution isolation: ll-solution-runner

#### Overview
ll-solution-runner is a standalone service implemented in Python, designed for the secure execution of user-submitted code sent from the backend server (ll-server).

##### Technology Stack
- **Programming Language**: Python
- **Web Framework for REST API**: Flask (alternative option) — for simpler tasks with synchronous processing.
- **Containerization and Isolation**:
  - Docker — for isolating code execution in secure containers with time and memory limits.
  - Docker Compose — for managing dependencies and simplifying service deployment.