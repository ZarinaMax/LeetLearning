# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл executor.py в рабочую директорию
COPY executor.py /app/executor.py

# Устанавливаем команду по умолчанию для запуска контейнера
CMD ["python", "/app/executor.py"]
