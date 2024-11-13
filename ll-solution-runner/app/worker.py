# leet-learning/ll-solution-runner/app/worker.py

import os
import redis
import rq
import logging
from .docker_manager import run_code_in_docker

def start_worker():
    # Настройка логирования
    # logging.basicConfig(level=logging.DEBUG)
    # logger = logging.getLogger('rq.worker')
    # logger.setLevel(logging.DEBUG)
    
    redis_url = os.getenv('REDIS_URL', 'redis://redis:6379/0')
    redis_conn = redis.from_url(redis_url)
    queue_name = 'll-solution-runner-tasks'
    queue = rq.Queue(queue_name, connection=redis_conn)

    worker = rq.Worker(queue)
    worker.work()

if __name__ == '__main__':
    start_worker()
