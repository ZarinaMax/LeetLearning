import numpy as np

class Solution:
    def solution(self, arr) -> None:
        for idx in range(len(arr)):
            arr[idx] += 1
        return arr