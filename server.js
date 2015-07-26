// Decided to start a main file over here
// If this will be the main file then we will add 
// it in the dependencies 

var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var user       = require('./schemas/userSchema')


// Connection to the dbase. 
// TODO: Create a stable central database

//Connection to the dbase
//For production should sort of set up a stable database
mongoose.connect('localhost:2701/FPrac')

//Config the pap to user bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

//Routes for our API 
var router = express.Router()

router.use(function(req, res, next){

    console.log('Something is happening')
    next()
})

router.route('/users')

    //Create a User
    .post(function(req, res){
        var user = new user()

        //TODO: Pass all the values into the model

        user.save(function(err){
            if(err)
                res.send(err)

            res.json({message: 'User created'})
        })
    })

    //Get all the users
    .get(function(req, res){
        user.find(function(err, users){
            if(err)
                res.send(err)

            res.json(users)

        })
    })

    //TODO: debug, Add all the other end points 

    //Register all our routes and prefix them with v1

    app.use('v1', router)

    //Starting the server 
    app.listen(port)
    console.log('Listening on port' + port)