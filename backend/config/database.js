const mongoose = require('mongoose')

const connectDb = async ()=>{
    mongoose.connect(process.env.DB_URI)
        .then((data)=>{
            console.log(`Mongodb connected with server :  ${data.connection.host}`);
        })
}

module.exports = connectDb;