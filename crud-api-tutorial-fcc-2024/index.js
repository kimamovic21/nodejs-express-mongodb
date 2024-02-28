const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const productRoute = require('./routes/productRoute');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello from Node API Server');
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
