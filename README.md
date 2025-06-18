### ✅ **Repository Description**

> A simple Node.js Task Manager CLI and API app that allows users to manage tasks via the command line or a RESTful API. Supports adding, listing, completing, and deleting tasks, with persistent storage using a JSON file.

---

### ✅ **README.md**

```markdown
# 📝 Task Manager

A simple task management application built with Node.js that supports both a **command-line interface (CLI)** and a **RESTful API**. Tasks are persisted in a local `tasks.json` file.

---

## 🚀 Features

- Add tasks via CLI or HTTP API
- View all tasks
- Mark tasks as completed
- Delete tasks
- Persistent task storage (JSON file)
- Lightweight built-in HTTP server (no external libraries)

---

## 📁 Project Structure
```

task-manager/
├── app.js # Main CLI and server entrypoint
├── taskManager.js # Task handling module (CRUD operations)
├── tasks.json # JSON file for task persistence
└── package.json # Project configuration

````

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
npm install
````

---

## 💻 CLI Usage

Run the app with Node.js and the following commands:

### ➕ Add a Task

```bash
node app.js add "Task Title" "Task Description"
```

### 📋 List All Tasks

```bash
node app.js list
```

### ✅ Mark Task as Complete

```bash
node app.js complete <taskId>
```

### ❌ Delete a Task

```bash
node app.js delete <taskId>
```

---

## 🌐 HTTP API Usage

Start the server:

```bash
node app.js server
```

The server runs on `http://localhost:3000`.

### 🔹 GET /

Returns a welcome message.

### 🔹 GET /tasks

Returns all tasks in JSON format.

### 🔹 POST /tasks

Create a new task by sending a JSON payload.

#### Example Request:

```http
POST /tasks HTTP/1.1
Content-Type: application/json

{
  "title": "New Task",
  "description": "This is a new task"
}
```

---

## ⚠️ Error Handling

- Handles missing or malformed arguments
- Catches invalid task IDs
- Prevents crashes on malformed JSON
- Graceful fallback for file I/O issues

---

## 🛠️ Technologies Used

- Node.js (no frameworks)
- Built-in modules: `fs`, `http`, `path`

---
