// app.js
const http = require('http')
const taskManager = require('./taskManager')

const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'add':
    const [title, description] = args.slice(1)
    if (!title || !description) {
      console.error('Usage: node app.js add "Title" "Description"')
      process.exit(1)
    }
    const newTask = taskManager.addTask(title, description)
    console.log('Task added:', newTask)
    break

  case 'list':
    const tasks = taskManager.getAllTasks()
    console.log(tasks)
    break

  case 'complete':
    const completeId = args[1]
    if (!completeId) {
      console.error('Usage: node app.js complete <taskId>')
      process.exit(1)
    }
    try {
      const updated = taskManager.markTaskComplete(completeId)
      console.log('Marked complete:', updated)
    } catch (err) {
      console.error(err.message)
    }
    break

  case 'delete':
    const deleteId = args[1]
    if (!deleteId) {
      console.error('Usage: node app.js delete <taskId>')
      process.exit(1)
    }
    try {
      const removed = taskManager.deleteTask(deleteId)
      console.log('Deleted:', removed)
    } catch (err) {
      console.error(err.message)
    }
    break

  case 'server':
    const PORT = 3000
    const server = http.createServer((req, res) => {
      if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Welcome to the Task Manager API!')
      } else if (req.method === 'GET' && req.url === '/tasks') {
        const tasks = taskManager.getAllTasks()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(tasks))
      } else if (req.method === 'POST' && req.url === '/tasks') {
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const { title, description } = JSON.parse(body)
            if (!title || !description) throw new Error('Invalid data')
            const task = taskManager.addTask(title, description)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(task))
          } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
    })

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
    break

  default:
    console.error(
      'Invalid command. Use add, list, complete, delete, or server.'
    )
    process.exit(1)
}
