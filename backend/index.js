const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./router/user')
const stockRouter = require('./router/stock')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express()

const corsOptions = {
    origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/stock', stockRouter)


const port = process.env.PORT


mongoose.connect(process.env.MONGODB)
    .then(() => {
        app.listen(port, () => {
            console.log(`The server running on PORT ${port}`)
        })
    })
    .catch((error) => {
        console.log(error.message)
    })

// user
// stock
// stock price