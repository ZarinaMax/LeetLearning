# ll-solution-runner

## Overview

`ll-solution-runner` is a standalone service implemented in Python, designed for the secure execution of user-submitted code. It receives code and test cases from a backend server, executes the code in isolated Docker containers, and returns the results of the execution.

## Requirements

- Docker
- Docker Compose

## Setup Instructions

### Step 1: Build the Executor Image

Before running the entire application, you need to build the `executor_image` which will be used to execute the user-submitted code in isolated Docker containers.

Navigate to the `executor` directory and build the Docker image:

```sh
cd executor
docker build -t executor_image .
```

### Step 2: Run the Application with Docker Compose

Once the `executor_image` is built, you can run the entire application using `docker-compose`.

Navigate back to the root directory of the project and run:

```sh
cd ..
docker-compose up --build
```

This command will build and start all the services defined in the `docker-compose.yaml` file, including the Flask web server, Redis, and the worker.

### Step 3: Access the Application

The Flask web server will be accessible at `http://localhost:5000`.

## API Endpoints

### Run Code

- **URL**: `/api/run_code`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "code": "base64_encoded_code",
    "tests": [
      {
        "in": "input_data",
        "expected_out": "expected_output"
      },
      ...
    ],
    "attempt_id": "unique_attempt_id"
  }
  ```
- **Response**:
  ```json
  {
    "queued_task_id": "unique_task_id"
  }
  ```

### Get Result

- **URL**: `/api/get_result/<queued_task_id>`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "attempt_id": "unique_attempt_id",
    "status": "success" | "failure",
    "results": [
      {
        "test": {
          "in": "input_data",
          "expected_out": "expected_output"
        },
        "result": "passed" | "failed",
        "output": "actual_output",
        "error": "error_message_if_any",
        "execution_time": "time_in_seconds",
        "memory_usage": "memory_in_mb"
      },
      ...
    ],
    "error": "error_message_if_any"
  }
  ```

## Project Structure

- `app/`: Contains the Flask application code.
- `executor/`: Contains the Dockerfile and script for the executor image.
- `specification/`: Contains the project specifications and documentation.
- `requirements.txt`: Lists the Python dependencies.
- `docker-compose.yaml`: Docker Compose configuration file.
- `Dockerfile`: Dockerfile for the Flask application.

## Development

To develop and test the application locally, you can use the provided `docker-compose` setup. Make sure to rebuild the images if you make any changes to the code:

```sh
docker-compose up --build
```

## License

This project is licensed under the MIT License.
```

This `README.md` file provides clear instructions on how to build the `executor_image` and run the entire application using `docker-compose`. It also includes information about the API endpoints and the project structure.
