require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const proudctRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/products', proudctRoute);

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.use(errorMiddleware);

mongoose.set("strictQuery", false)
mongoose.
    connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, ()=> {
            console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) => {
        console.log(error)
    })