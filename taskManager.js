// taskManager.js
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'tasks.json')

let tasks = []

function loadTasksFromFile() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    tasks = JSON.parse(data)
  } catch (err) {
    console.error('Error loading tasks:', err.message)
    tasks = []
  }
}

function saveTasksToFile() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
  } catch (err) {
    console.error('Error saving tasks:', err.message)
  }
}

function addTask(title, description) {
  loadTasksFromFile()
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  saveTasksToFile()
  return newTask
}

function getAllTasks() {
  loadTasksFromFile()
  return tasks
}

function markTaskComplete(taskId) {
  loadTasksFromFile()
  const task = tasks.find((t) => t.id === parseInt(taskId))
  if (task) {
    task.completed = true
    saveTasksToFile()
    return task
  } else {
    throw new Error('Task not found')
  }
}

function deleteTask(taskId) {
  loadTasksFromFile()
  const index = tasks.findIndex((t) => t.id === parseInt(taskId))
  if (index !== -1) {
    const removed = tasks.splice(index, 1)
    saveTasksToFile()
    return removed[0]
  } else {
    throw new Error('Task not found')
  }
}

module.exports = {
  addTask,
  getAllTasks,
  markTaskComplete,
  deleteTask,
  saveTasksToFile,
  loadTasksFromFile,
}
