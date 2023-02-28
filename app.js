const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blogrouter = require('./blogrouter');


const user = require('./userrouter');
app.use(express.json())
app.use('/user', user)
app.use('/blog', Blogrouter)

mongoose.set('strictQuery', false);
// const adminPassword = encodeURIComponent(process.env.ADMIN_PASSWORD)
mongoose.connect(
    'mongodb+srv://admin:NYeRq7Ah8QTnIGyV@cluster0.dnrnfjx.mongodb.net/?retryWrites=true&w=majority'
).then(()=>app.listen(4002),console.log("database is connected to the server")).catch((err)=>console.log("error ocured", err))
// `mongoose.set('strictQuery', false);`
// app.listen(4002);


// NYeRq7Ah8QTnIGyV --password