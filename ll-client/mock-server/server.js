const express = require("express");
const cors = require("cors");
const app = express();
const port = 5433; // Порт для mock сервера

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для обработки CORS
app.use(cors());

// Пример данных пользователей
const users = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: 2,
    username: "jane_doe",
    email: "jane@example.com",
    password: "password456",
  },
];

// Пример данных для авторизации
const authTokens = {};

// Пример данных для задач
const tasks = [
  {
    id: 1,
    name: "Task 1",
    timeout: 60,
    memory_limit: 128,
    description: "Description for Task 1",
    difficulty: "easy",
    created_at: new Date(),
    code_template: Buffer.from(
      "class Solution:\n\tdef solve(self, nums: List[int], target: int) -> List[int]:",
    ).toString("base64"),
  },
  {
    id: 2,
    name: "Task 2",
    timeout: 120,
    memory_limit: 256,
    description: "Description for Task 2",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from("# Write your code here").toString("base64"),
  },
  {
    id: 3,
    name: "Task 3",
    timeout: 180,
    memory_limit: 512,
    description: "Description for Task 3",
    difficulty: "hard",
    created_at: new Date(),
    code_template: Buffer.from("# Write your code here").toString("base64"),
  },
];

// Пример данных для хранения попыток
const attempts = [];

// Маршрут для регистрации
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Маршрут для логина
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = `token-${user.id}`;
    authTokens[token] = user;
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Middleware для проверки токена
app.use((req, res, next) => {
  if (req.path.startsWith("/api/tasks")) {
    return next();
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (token && authTokens[token]) {
    req.user = authTokens[token];
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Маршрут для получения данных пользователя
app.get("/api/user/me", (req, res) => {
  res.json(req.user);
});

// Маршрут для обновления данных пользователя
app.put("/api/user/me", (req, res) => {
  const { username, email, password } = req.body;
  const user = req.user;
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  res.json(user);
});

// Маршрут для получения списка задач
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Маршрут для получения деталей конкретной задачи
app.get("/api/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Маршрут для отправки решения задачи
app.post("/api/attempts", (req, res) => {
  const { taskId, code } = req.body;
  const newAttempt = {
    id: attempts.length + 1,
    taskId,
    code,
    status: "pending", // Статус попытки (pending, success, failure)
    created_at: new Date(),
  };
  attempts.push(newAttempt);

  // Имитация обработки решения (например, через 2 секунды)
  setTimeout(() => {
    newAttempt.status = "success"; // Или "failure" в зависимости от логики
  }, 2000);

  res.status(201).json(newAttempt);
});

// Маршрут для получения статуса попытки
app.get("/api/attempts/:id", (req, res) => {
  const attemptId = parseInt(req.params.id, 10);
  const attempt = attempts.find((a) => a.id === attemptId);
  if (attempt) {
    res.json(attempt);
  } else {
    res.status(404).json({ message: "Attempt not found" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});
