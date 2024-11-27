# leet-learning\ll-solution-runner\app\docker_manager.py

import docker
import base64
import json
import time
import logging

# Настройка логирования
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('rq.worker')
logger.setLevel(logging.DEBUG)

def run_code_in_docker(code, tests, attempt_id):
    result = {
        'attempt_id': attempt_id,
        'status': 'success',
        'results': []
    }
    for test in tests:
        input_data = test['in']
        expected_output = test['expected_out']
        start_time = time.time()
        actual_output = execute_code_in_docker(code, input_data)
        execution_time = time.time() - start_time
        test_result = compare_results(actual_output, expected_output, test, execution_time)
        result['results'].append(test_result)
        if test_result['result'] == 'failed':
            result['status'] = 'failed'
    return result

def execute_code_in_docker(code, input_data):
    client = docker.from_env()
    encoded_input_data = base64.b64encode(input_data.encode('utf-8')).decode('utf-8')
    try:
        container = client.containers.run(
            image='executor_image',
            command=['python', '/app/executor.py', code, encoded_input_data],
            detach=False,
            remove=True,
            stdout=True,
            stderr=True
        )
        logs = container.decode('utf-8').strip()  # Убедитесь, что убираете лишние пробелы и пустые строки
        logging.debug(f'Container logs: {logs}')

        # Ищем блок, начинающийся и заканчивающийся на ###
        start_marker = '###'
        end_marker = '###'
        start_index = logs.find(start_marker)
        end_index = logs.rfind(end_marker)

        if start_index != -1 and end_index != -1 and start_index < end_index:
            json_str = logs[start_index + len(start_marker):end_index].strip()
            logging.debug(f'Extracted JSON: {json_str}')
            result = json.loads(json_str)
            return result
        else:
            logging.error('Markers not found or invalid in logs')
            return {'error': 'Markers not found or invalid in logs', 'logs': logs}
    except json.JSONDecodeError as e:
        logging.error(f'JSON decode error: {e}')
        return {'error': f'JSON decode error: {e}'}
    except Exception as e:
        logging.error(f'Error executing code in Docker: {e}')
        return {'error': str(e)}

def compare_results(actual_output, expected_output, test, execution_time):
    if 'error' in actual_output:
        return {
            'test': test,
            'result': 'error',
            'output': None,
            'error': actual_output.get('error'),
            'execution_time': 0,
            'memory_usage': 0
        }

    result = {
        'test': test,
        'result': 'passed' if actual_output.get('result') == expected_output else 'failed',
        'output': actual_output.get('result'),
        'error': None if actual_output.get('result') == expected_output else f'Expected "{expected_output}", but got "{actual_output.get("result")}"',
        'execution_time': execution_time,
        'memory_usage': 0  # Placeholder for memory usage
    }
    return result
