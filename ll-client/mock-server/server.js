// ll-client/mock-server/server.js

const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Добавьте axios для отправки HTTP-запросов
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

// Набор существующих тегов
const tags = [
  "natural language processing",
  "computer vision",
  "reinforcement learning",
  "generative models",
  "neural networks",
  "markov chains",
  "chatbots",
  "image recognition",
  "speech recognition",
  "data cleaning",
  "data visualization",
  "exploratory data analysis",
  "feature engineering",
  "hypothesis testing",
  "regression analysis",
  "classification",
  "clustering",
  "time series analysis",
  "beginner",
  "intermediate",
  "advanced",
  "python",
  "numpy",
  "pandas",
  "matplotlib",
  "scikit-learn",
  "tensorflow",
  "pytorch",
  "keras",
  "predictive modeling",
  "anomaly detection",
  "optimization",
  "recommendation systems",
  "big data",
  "real-time processing",
  "text generation",
];

// Пример данных для задач
const tasks = [
  {
    id: 1,
    name: "Hello, username!",
    description:
      "Write a function that takes a username and returns a greeting message.",
    difficulty: "easy",
    created_at: new Date(),
    code_template: Buffer.from(
      "username = input()\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      { in: "Alice", expected_out: "Hello, Alice!" },
      { in: "Bob", expected_out: "Hello, Bob!" },
    ],
    tags: ["beginner", "python"],
  },
  {
    id: 2,
    name: "Tokenize Text",
    description:
      "Write a function that takes a paragraph of text and tokenizes it into sentences.",
    difficulty: "easy",
    created_at: new Date(),
    code_template: Buffer.from(
      "text = input()\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      {
        in: "Hello world. How are you?",
        expected_out: ["Hello world.", "How are you?"],
      },
      {
        in: "It's raining. Stay safe!",
        expected_out: ["It's raining.", "Stay safe!"],
      },
    ],
    tags: ["beginner", "python", "natural language processing"],
  },
  {
    id: 3,
    name: "Anomaly Detection",
    description:
      "Given a list of sensor readings, return the indices where the readings are 2 standard deviations above the mean.",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from(
      "readings = list(map(float, input().split()))\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      { in: "1 2 3 100 2 3", expected_out: [3] },
      { in: "10 12 10 11 50", expected_out: [4] },
    ],
    tags: ["intermediate", "python", "anomaly detection"],
  },
  {
    id: 4,
    name: "Random Walk",
    description:
      "Write a function to generate a random walk of n steps starting from 0.",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from(
      "n = int(input())\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      { in: "5", expected_out: [0, 1, 0, 1, 0, -1] },
      { in: "10", expected_out: [0, 1, 0, 1, 0, -1, 0, 1, 0, -1, 0] },
    ],
    tags: ["intermediate", "python"],
  },
  {
    id: 5,
    name: "Linear Regression Sales Prediction",
    description:
      "Implement linear regression to predict sales given data on advertising budgets for TV, radio, and newspapers.",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from(
      "from sklearn.linear_model import LinearRegression\nimport numpy as np\n# Write your code here\n",
    ).toString("base64"),
    tests: [
      {
        in: "TV: [230.1, 44.5, 17.2], Radio: [37.8, 39.3, 45.1], Newspaper: [69.2, 45.1, 69.3], Sales: [22.1, 10.4, 9.3]",
        expected_out: [22.1, 10.4, 9.3],
      },
    ],
    tags: ["intermediate", "python", "regression analysis"],
  },
  {
    id: 6,
    name: "K-Means Clustering",
    description: "Cluster a set of 2D points using the K-Means algorithm.",
    difficulty: "hard",
    created_at: new Date(),
    code_template: Buffer.from(
      "from sklearn.cluster import KMeans\nimport numpy as np\n# Write your code here\n",
    ).toString("base64"),
    tests: [
      { in: "Points: [(1, 1), (2, 2), (10, 10)] k=2", expected_out: [0, 0, 1] },
    ],
    tags: ["advanced", "python", "clustering"],
  },
  {
    id: 7,
    name: "Text Summarization",
    description:
      "Write a function to generate a summary by selecting key sentences from a paragraph.",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from(
      "text = input()\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      {
        in: "This is a very long text. It talks about various topics. Key points include X and Y.",
        expected_out: [
          "It talks about various topics.",
          "Key points include X and Y.",
        ],
      },
    ],
    tags: ["intermediate", "python", "natural language processing"],
  },
  {
    id: 8,
    name: "CNN Image Classification",
    description:
      "Build and train a simple CNN to classify images into two categories.",
    difficulty: "hard",
    created_at: new Date(),
    code_template: Buffer.from(
      "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv2D, Flatten, Dense\n#Write your code here\n",
    ).toString("base64"),
    tests: [
      {
        in: "Dataset: Images of cats and dogs",
        expected_out: "Model trained and evaluated",
      },
    ],
    tags: ["Advanced", "Python", "Computer Vision"],
  },
  {
    id: 9,
    name: "Sentiment Analysis Using Transformers",
    description:
      "Build a sentiment analysis tool using a pre-trained transformer model (e.g., BERT or DistilBERT). The tool should classify input text as positive, neutral, or negative.",
    difficulty: "medium",
    created_at: new Date(),
    code_template: Buffer.from(
      "from transformers import pipeline\n# Write your code here\n",
    ).toString("base64"),
    tests: [
      { in: "I love this product!", expected_out: "positive" },
      { in: "It's okay, nothing special.", expected_out: "neutral" },
      { in: "This is the worst service ever.", expected_out: "negative" },
    ],
    tags: [
      "intermediate",
      "python",
      "natural language processing",
      "text generation",
    ],
  },
];

// Пример данных для хранения попыток
const attempts = [
  {
    id: 1,
    userId: 1,
    taskId: 1,
    code: "code1",
    status: "success",
    created_at: new Date(),
  },
  {
    id: 2,
    userId: 1,
    taskId: 4,
    code: "code2",
    status: "failure",
    created_at: new Date(),
  },
  {
    id: 3,
    userId: 1,
    taskId: 6,
    code: "code3",
    status: "success",
    created_at: new Date(),
  },
];

// Маршрут для регистрации
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
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
  if (req.path.startsWith("/api/tasks") || req.path.startsWith("/api/tags")) {
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
  const task = tasks.find((t) => t.id === parseInt(taskId, 10));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const newAttempt = {
    id: attempts.length + 1,
    userId: req.user.id, // Добавляем userId из токена
    taskId: task.id,
    code,
    status: "pending", // Статус попытки (pending, success, failure)
    created_at: new Date(),
  };
  attempts.push(newAttempt);

  // Отправка кода на выполнение в solution-runner
  axios
    .post("http://localhost:5000/api/run_code", {
      code,
      tests: task.tests,
      attempt_id: newAttempt.id,
    })
    .then((response) => {
      const { queued_task_id } = response.data;
      newAttempt.queued_task_id = queued_task_id;
      res.status(201).json(newAttempt);
    })
    .catch((error) => {
      console.error("Error submitting code to solution-runner:", error);
      res
        .status(500)
        .json({ message: "Error submitting code to solution-runner" });
    });
});

// Маршрут для получения статуса попытки
app.get("/api/attempts/:id", (req, res) => {
  const attemptId = parseInt(req.params.id, 10);
  const attempt = attempts.find((a) => a.id === attemptId);
  if (attempt) {
    if (attempt.queued_task_id) {
      // Получение результата выполнения из solution-runner
      axios
        .get(`http://localhost:5000/api/get_result/${attempt.queued_task_id}`)
        .then((response) => {
          const result = response.data;
          attempt.status = result.status;
          attempt.results = result.results;
          res.json(attempt);
        })
        .catch((error) => {
          console.error("Error fetching result from solution-runner:", error);
          res
            .status(500)
            .json({ message: "Error fetching result from solution-runner" });
        });
    } else {
      res.json(attempt);
    }
  } else {
    res.status(404).json({ message: "Attempt not found" });
  }
});

// Маршрут для получения всех попыток пользователя
app.get("/api/user/attempts", (req, res) => {
  const userAttempts = attempts.filter(
    (attempt) => attempt.userId === req.user.id,
  );
  res.json(userAttempts);
});

// Маршрут для получения всех попыток пользователя по задаче
app.get("/api/user/attempts/task/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  const userAttempts = attempts.filter(
    (attempt) => attempt.userId === req.user.id && attempt.taskId === taskId,
  );
  res.json(userAttempts);
});

// Маршрут для получения набора существующих тегов
app.get("/api/tags", (req, res) => {
  res.json(tags);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Mock server is running at http://localhost:${port}`);
});
