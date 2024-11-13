# leet-learning/ll-solution-runner/app/api.py

from flask import Blueprint, request, jsonify
from .docker_manager import run_code_in_docker
from .task_queue import queue_task, get_task_result

api_bp = Blueprint('api', __name__)

@api_bp.route('/run_code', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code')
    tests = data.get('tests')
    attempt_id = data.get('attempt_id')

    if not code or not tests or not attempt_id:
        return jsonify({'error': 'Invalid input'}), 400

    queued_task_id = queue_task(code, tests, attempt_id)
    return jsonify({'queued_task_id': queued_task_id}), 202

@api_bp.route('/get_result/<queued_task_id>', methods=['GET'])
def get_result(queued_task_id):
    result = get_task_result(queued_task_id)
    if 'error' in result:
        return jsonify(result), 404 if result['error'] == 'Task not found' else 500
    return jsonify(result)
