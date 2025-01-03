const express = require('express')
const userRoutes = require('./router/user')
const stockRouter = require('./router/stock')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/stock', stockRouter)


const port = process.env.PORT

app.listen(port, () => {
    console.log(`The server running on port ${port}`)
})