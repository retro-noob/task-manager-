const connectToMongo = require('./db');
const express = require('express')
var cors = require ('cors')

connectToMongo();

const app = express()
const port = 8080

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
 app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Diary backend listening on port ${port}`)
})
//We are creating a Routes folder to store all the routes of the iNotebook application. After that, We would be linking the routes with the help of app.use as shown below

