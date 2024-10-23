Work_dir: LL-solution-runner

## Сборка контейнера

```bash
docker build -f pytest_runner/pytest.dockerfile pytest_runner/ -t pytest_runner:latest
```

## Запуск

```bash
docker run --mount type=bind,source="$(pwd)"/src/run,target=/home/pytests_runner/data/run --mount type=bind,source="$(pwd)"/pytest_runner/data/test,target=/home/pytests_runner/data/test -e TEST_NUM='100' -e TASK_ID='1' pytest_runner:latest
```

## Запуск в режиме bash(чтобы зайти внутрь контейнера)

```bash
docker run -it --mount type=bind,source="$(pwd)"/src/run,target=/home/pytests_runner/data/run --mount type=bind,source="$(pwd)"/pytest_runner/data/test,target=/home/pytests_runner/data/test -e TEST_NUM='100' -e TASK_ID='1' pytest_runner:latest bash
```