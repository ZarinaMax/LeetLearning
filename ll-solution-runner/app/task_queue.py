# leet-learning/ll-solution-runner/app/task_queue.py

from redis import Redis
import rq
from .docker_manager import run_code_in_docker
import logging

redis_conn = Redis.from_url('redis://redis:6379/0')
task_queue = rq.Queue('ll-solution-runner-tasks', connection=redis_conn)

def queue_task(code, tests, attempt_id):
    job = task_queue.enqueue(run_code_in_docker, code, tests, attempt_id)
    return job.id  # Возвращаем queued_task_id

def get_task_result(queued_task_id):
    try:
        job = rq.job.Job.fetch(queued_task_id, connection=redis_conn)
        if job.is_finished:
            return job.result
        elif job.is_failed:
            logging.error(f'Task {queued_task_id} failed with exception: {job.exc_info}')
            return {'error': f'Task {queued_task_id} failed', 'details': job.exc_info}
        else:
            return {'status': 'pending', 'message': 'Task is still being processed'}
    except rq.exceptions.NoSuchJobError:
        logging.error(f'Task {queued_task_id} not found')
        return {'error': 'Task not found'}
    except Exception as e:
        logging.error(f'Error fetching task {queued_task_id}: {e}')
        return {'error': f'Error fetching task {queued_task_id}', 'details': str(e)}
