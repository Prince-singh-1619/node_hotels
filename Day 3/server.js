const express = require('express')      //these two lines & last line are neccesary to create a server
const app = express();                  // --^
const db = require('../models/db')

const bodyParser = require('body-parser')   //this is used to handle different types of incoming data from the frontend
app.use(bodyParser.json())  //req.body

// const Person = require('../models/person');
// const MenuItem = require('../models/menuItem')

app.get('/', function(req, res) {       //normal function declaration 
    res.send('Welcome to the new hotel of Node js learning')
})

//import the router files
const menuItemRoutes = require('../routes1/menuItemRoutes')
const personRoutes = require('../routes1/personRoutes')
//use the routers
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

// app.get('/home', (req, res) =>{     //arrow function 
//     res.send('hey, you\'re welcome home')
// })

app.get('/yason', (req, res) =>{
    var customized = {              // here we've created a json 
        name: "Yason",
        size: "not so long",
        type: "new",
        form: true,
    }
    res.send(customized)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
});