FROM python:3.8-slim-bullseye

ARG test_id
ARG test_num
# ENV SOLUTION_INPUT $input

RUN apt-get update
COPY requirements.txt .
RUN python3.8 -m pip install --upgrade pip
RUN python3.8 -m pip install -r requirements.txt

USER root
RUN useradd -ms /bin/bash pytests_runner
WORKDIR /home/pytests_runner

COPY --chown=pytests_runner ./ ./
USER pytests_runner


ENV PATH=$PATH:/home/pytests_runner/.local/bin
ENV PYTHONPATH=$PATH:/home/pytests_runner/data/test
ENV PYTHONPATH=$PATH:/home/pytests_runner/data/run


ENV TEST_ID $test_id
ENV TEST_NUM $test_num
CMD pytest --tb=short --junitxml=/home/pytests_runner/data/test/test.log