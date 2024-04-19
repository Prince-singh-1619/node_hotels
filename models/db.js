const mongoose = require('mongoose')

//define the mongodb connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' //replace mydatabase with your db name

//setup mongo URL
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   //these 2 parameters are necessary to pass
})

//Get the default connection
//mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection

//define event listener for database connection

db.on('connected', () =>{
    console.log('Connected to MongoDB Server')
})

db.on('error', () =>{
    console.log('MongoDB connection error', err)
})

db.on('disconnected', () =>{
    console.log('MongoDB disconnected')
})

//export the database connection
module.exports = db