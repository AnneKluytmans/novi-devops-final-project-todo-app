# ✅ DevOps Todo App

Simple **Todo application** built to demonstrate **DevOps and CI/CD** for my final assignment for the DevOps module at [Novi University](https://www.novi.nl). 

This project contains a **Node.js REST API**, a **React frontend**, a **SQLite database**, including **Docker and CI/CD pipelines**.

---

## Table of contents

- [Preview](#preview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [How To Run](#how-to-run)
- [Project Structure](#project-structure)
- [Author](#author)
- [License](#license)

---

## Preview

<details>
<summary><strong>Todo App Screenshot</strong></summary>  

![Todo App Screenshot](/screenshots/screenshot.png)
</details>  


![Demo Todo App](/screenshots/demo.gif)

---

## Features

### 🖥️ Frontend (React + Vite)
- View all todos
- Add a new todo
- Mark todos as complete
- Delete todos
- Clean and minimal UI with basic styling

### 🔧 Backend (Node.js + Express)
- RESTful API
- SQLite database (in-memory, CI-friendly)
- CRUD operations
- Automated API tests with Jest & Supertest

### 🚀 DevOps
- Node.js LTS versions
- Automated tests for backend
- Dockerfile & Dokcer Compose
- CI/CD pipelines

---

## API Endpoints

| Method | Endpoint            | Description             |
|------|---------------------|-------------------------|
| GET  | `/api/todos`        | Get all todos       |
| GET  | `/api/todos/:id`    | Get a single todo   |
| POST | `/api/todos`        | Create a new todo    |
| PUT  | `/api/todos/:id`    | Update a todo      |
| DELETE | `/api/todos/:id`  | Delete a todo        |


### 📄 Todo Model

```json
{
  "id": 1,
  "title": "Learn DevOps",
  "completed": false
}

```

---

## Tech Stack

### 🖥️ Frontend
- React
- Vite
- Axios

### 🔧 Backend
- Express
- SQLite
- Jest & Supertest

### 🚀 DevOps
- Git & GitHub
- Docker & Docker Compose
- GitHub Actions (CI)

---

## Requirements

- [Node.js](https://nodejs.org/)
    - Backend: Node 18 LTS
    - Frontend: Node 20+ 
- [npm](https://www.npmjs.com/)

---

## How to run

### Clone the repository

```bash
git clone https://github.com/AnneKluytmans/novi-devops-final-project-todo-app.git
cd todo-app
```

### Start the Backend
```bash
cd backend
npm install
nvm run
npm start
```

Backend will run on:
```bash
http://localhost:3000
```

### Start the Frontend
```bash
cd frontend
npm install
nvm use 20
npm run dev
```

Frontend will run on:
```bash
http://localhost:5173
```

### Test

Backend tests:
```bash
cd backend
npm test
```

### 🐳 Docker (Optional)

Build and run the application with Docker ....


---

## Project Structure

todo-app/
│
├── backend/
│   ├── src/
│   ├── tests/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── docker-compose.yml
└── .github/workflows/


---

## Author
> "This project was developed by [Anne Kluytmans](https://github.com/AnneKluytmans), a Software Development student at [NOVI](https://www.novi.nl/)."


## License

> "This project is for educational purposes only. 
