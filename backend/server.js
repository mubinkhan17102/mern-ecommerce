const express = require('express')
const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
const dotenv = require('dotenv')
const connectDb = require('./config/database')
const errorHandleMiddleware = require('./middleware/error');
const isAuthinticated = require('./middleware/auth')
const cookieParser = require('cookie-parser')

//Uncauth error by indefined method
process.on('uncaughtException', (err)=>{
    console.log(`Eror: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

dotenv.config()
const app = express()


connectDb()
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', productRouter);
app.use('/api/v1', userRouter)
app.use(errorHandleMiddleware)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, ()=>{
    console.log(`server start on http://localhost:${PORT}`)
})

//Undalse rejection like databse stop any service shut down
process.on('unhandledRejection', err=>{
    console.log(`Error ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(()=>{
        process.exit()
    })
})