const mongoose = require("mongoose")
require("dotenv").config();
console.log(process.env.DB_CONN_URI)


const dbConfig=async ()=>{
    await mongoose.connect(process.env.DB_CONN_URI)
    .then(()=>{
        console.log('Connected!')
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=dbConfig