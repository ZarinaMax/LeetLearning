### Communication between ll-server and ll-solution-runner.

**ll-server**

* Send a solution.py file along with a list of expected test results to ll-solution-runner.
* The solution.py file should integrate into the file system of ll-solution-runner and be used by the main application (main.py).
* The expected test results are passed as arguments when calling the run method in main.py.

**ll-solution-runner**

* Receives the solution.py file and list of expected test results from ll-server.
* Creates a Docker image with the required dependencies for running the main application (main.py).
* Integrates the solution.py file into the Docker image's file system.
* Runs the main application in a container, passing the expected test results as arguments to the run method.
* If any tests fail, captures the error message and returns it to ll-server along with the number of the first failed test.
