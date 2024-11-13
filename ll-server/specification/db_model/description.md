**Schema**

leet-learning

**Tables:**

### User

* **id (PK)**: Unique identifier for each user
* **username**: The username chosen by the user
* **email**: The email address associated with the user account
* **password**: The hashed password for user authentication
* **created_at**: Timestamp when the user account was created

### Task

* **id (PK)**: Unique identifier for each task
* **name**: The name of the task
* **timeout**: The time limit in seconds of test computation
* **memory_limit**: The memory limit in MB of test computation
* **description**: A brief description of the task
* **difficulty**: The difficulty level of the task (e.g., "easy", "medium", "hard")
* **created_at**: Timestamp when the task was created

### Test

* **id (PK)**: Unique identifier for each test case
* **task_id (FK)**: References the Task table, representing the parent task
* **test_num**: The number of this specific test case within its parent task
* **in**: The input data for this test case
* **out**: The expected output for this test case
* **created_at**: Timestamp when the test case was added

### Attempt

* **id (PK)**: Unique identifier for each attempt
* **user_id (FK)**: References the User table, representing the user who made the attempt
* **task_id (FK)**: References the Task table, representing the task being attempted
* **solution_file**: The solution file submitted by the user (e.g., Python code)
* **succeeded**: A boolean indicating whether the test was successful or not
* **failed_test**: Failed test related to Test table
* **created_at**: Timestamp when the attempt was made

**Relationships:**

* A User can have many Attempts.
* An Attempt belongs to one User and has one Task.
* A Test belongs to one Task.
* An Attempt can have one failed Test and is related to one Task.

**PK (Primary Key)**: Uniquely identifies a row in the table.
**FK (Foreign Key)**: References the primary key of another table, establishing a relationship between them.
