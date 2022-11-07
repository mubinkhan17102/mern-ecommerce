const express = require('express')
const productRouter = require('./routes/productRoute')
const dotenv = require('dotenv')
const connectDb = require('./config/database')
const errorHandleMiddleware = require('./middleware/error');

dotenv.config()
const app = express()


connectDb()
app.use(express.json());
app.use('/api/v1', productRouter);
app.use(errorHandleMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server start on http://localhost:${PORT}`)
})