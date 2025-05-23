const mongoose=require('mongoose')
require('dotenv').config();
//define the mongoDb connection url
//const mongoURL='mongodb://localhost:27017/hotes'
const mongoURL=process.env.MONGODB_URL;
//set mongoDb connection
mongoose.connect(mongoURL, {
    
})
//get the default connection
//Mongoose maintains a defaut connection object representing the MongoDB connection
const db=mongoose.connection
db.on('connected',()=>{
    console.log('connected to mongoDb server');
})
db.on('error',()=>{
    console.log('connected to mongoDb server');
})
db.on('disconnected',()=>{
    console.log('connected to mongoDb server');
})

//export the databse connection
module.exports=db;
