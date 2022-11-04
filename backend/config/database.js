const mongoose = require('mongoose')

const connectDb = async ()=>{
    await mongoose.connect(process.env.DB_URI)
    mongoose.connection.on('connected', ()=>{
        console.log(`Mongo connected`)
    })
    mongoose.connection.on('disconnect', ()=>{
        console.log(`Mongo disconnected`)
    })
}

module.exports = connectDb;