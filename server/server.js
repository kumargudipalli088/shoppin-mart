const express = require('express');

const app = express();
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

const itemsRoute = require("./Routes/itemsRoute")
const userRoute = require("./Routes/userRoute")
const billsRoute = require("./Routes/billsRoute")


app.use('/api/users', userRoute);
app.use('/api/items/' , itemsRoute);
app.use('/api/bills/' , billsRoute);
 
const path = require('path')

// if(process.env.NODE_ENV==='production')
// {
//     app.use('/',express.static('client/build'))
//     app.get('*', (req,res)=>{res.sendFile(path.resolve(__dirname, 'client','build','index.html'))})
// }
const port = process.env.PORT||  5000


const connect = require("./dbConnect");

app.listen(port, () =>{
connect
console.log(`Node JS Server Running at port ${port}`)});