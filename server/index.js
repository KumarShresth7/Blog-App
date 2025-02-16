const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const baseUrl = require('./baseUrl')
dotenv.config()

const app = express()

const corsOptions = {
    origin:`${baseUrl}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers as needed
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(process.env.MONGO_ATLAS_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth',require('./routes/authRoutes'))
app.use('/posts',require('./routes/postRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server is listening at ${PORT}`))