# Используем официальный образ Python
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Устанавливаем Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

# Копируем все файлы проекта в контейнер
COPY . .

# Устанавливаем переменную окружения для Flask
ENV FLASK_APP=run.py

# Открываем порт 5000 для Flask
EXPOSE 5000

# Запускаем Flask сервер
CMD ["flask", "run", "--host=0.0.0.0"]
