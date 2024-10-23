### Solution isolation: ll-solution-runner

#### Overview
ll-solution-runner is a standalone service implemented in Python, designed for the secure execution of user-submitted code sent from the backend server (ll-server).

#### Key Functions

##### Receiving and Processing Requests from ll-server:
- The REST API receives encoded task data, including user code and tests.
- Decodes the received code and prepares it for execution.

##### Executing Code in Isolated Docker Containers:
- Creates a separate Docker container for each code execution to ensure isolation and security.
- Configures containers with timeouts and memory limits to prevent excessive resource usage.

##### Solution Testing:
- Passes input data to the container and retrieves output data after the code is executed.
- Compares execution results with expected output to determine test success.
- Terminates execution if the solution fails a test and returns information about the failed test.

##### Returning Execution Results to ll-server:
- Sends test results back to ll-server, including information on which tests were passed, execution time, and memory usage.
- Logs information about executed tasks for further analysis and monitoring.

##### Technology Stack
- **Programming Language**: Python
- **Web Framework for REST API**: Flask (alternative option) — for simpler tasks with synchronous processing.
- **Containerization and Isolation**:
  - Docker — for isolating code execution in secure containers with time and memory limits.
  - Docker Compose — for managing dependencies and simplifying service deployment.