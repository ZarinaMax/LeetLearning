import pytest
import os
import json
from solution import Solution
    
@pytest.mark.parametrize("test_num", range(int(os.environ['TEST_NUM'])))
def test_answer(test_num):
    """
    """
    task_id = os.environ['TASK_ID']
    with open(f'data/test/tasks_tests/task_{task_id}/test_{test_num}.json') as f:
        test = json.load(f)
    
    user_output = Solution().solution(test['input'])
    assert user_output == test['output'], f"Выходные данные не соответствуют ожидаемым:\n Входные данные: {test['input']}"