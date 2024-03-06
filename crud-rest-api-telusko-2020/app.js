const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URI;
const PORT = 3000;

const app = express()

mongoose.connect(url)
const connection = mongoose.connection

connection.on('open', () => console.log('connected...'))

app.use(express.json())

const alienRouter = require('./routes/aliens')
app.use('/aliens',alienRouter)

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
