const mongoose = require('mongoose')
let URL = process.env.DATABASE_URL

mongoose.connect(URL);

let connectionObj = mongoose.connection

module.exports= connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

module.exports = connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})



