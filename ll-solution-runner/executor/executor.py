#leet-learning\ll-solution-runner\executor\executor.py
import sys
import base64
import json
import logging
import subprocess
import tempfile
import os

logging.basicConfig(level=logging.DEBUG)

def execute_user_code(code, input_data):
    # Декодируем пользовательский код из base64
    decoded_code = base64.b64decode(code).decode('utf-8')

    # Создаем временный файл для пользовательского кода
    with open('user_code.py', 'w') as f:
        f.write(decoded_code)

    # Создаем временный файл для входных данных
    with tempfile.NamedTemporaryFile(delete=False, mode='w') as temp_input_file:
        temp_input_file.write(input_data)
        temp_input_file_name = temp_input_file.name

    # Выполняем пользовательский код и получаем результат
    try:
        # Запускаем пользовательский код с перенаправлением input_data из временного файла
        with open(temp_input_file_name, 'r') as input_file:
            process = subprocess.Popen(
                ['python', 'user_code.py'],
                stdin=input_file,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            stdout, stderr = process.communicate()

        if process.returncode != 0:
            logging.error(f'Error executing user code: {stderr}')
            return {'error': stderr}

        logging.debug(f'Execution output: {stdout.strip()}')
        return {'result': stdout.strip()}
    except Exception as e:
        logging.error(f'Error executing user code: {e}')
        return {'error': str(e)}
    finally:
        # Удаляем временный файл
        try:
            os.remove(temp_input_file_name)
        except Exception as e:
            logging.error(f'Error removing temporary file: {e}')

if __name__ == "__main__":
    # Получаем код и входные данные из аргументов командной строки
    code = sys.argv[1]
    input_data = base64.b64decode(sys.argv[2]).decode('utf-8')

    # Выполняем пользовательский код
    result = execute_user_code(code, input_data)

    # Выводим результат в формате JSON с добавлением специальных символов
    print(f'### {json.dumps(result)} ###')
