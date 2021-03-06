var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//not part of default express
//TODO : Might not need the mongoose over here
var mongoose   = require('mongoose')
var passport = require('passport')
var session = require('express-session')

//TODO: To remove this 
var ejs = require('ejs')
var engines = require('consolidate')

//var routes = require('./routes/index');
var userController = require('./routes/users');
var eventController = require('./routes/events')
var authController = require('./routes/auth')
var cliController = require('./routes/client')
var auth2Controller = require('./routes/oauth2')

var app = express();

//Dbase connection with a preset mongo database online
mongoose.connect('mongodb://admin:admin@ds035593.mongolab.com:35593/sapp');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', engines.ejs)
//TODO: Remove this 
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use(session({
  secret:'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}))
//Path to the user routes

var router = express.Router();

//TODO: Create the endpoints of the clients authentication

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, auth2Controller.authorization)
  .post(authController.isAuthenticated, auth2Controller.decision);

router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, auth2Controller.token);
  
router.route('/clients')
  .post(authController.isAuthenticated, auth2Controller.authorization)
  .get(authController.isAuthenticated, cliController.getClients)

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers)
  
  //With basic authentication
  //.get(authController.isAuthenticated, userController.getUsers);

//
router.route('/users/:id')
/* .get(authController.isAuthenticated,userController.getUserById)
  .delete(authController.isAuthenticated, userController.deleteUser)
  .put(authController.isAuthenticated, userController.putUser); */

//API endpoint for /events
router.route('/events')
      /* .post(authController.isAuthenticated, eventController.postEvents)
    .get(authController.isAuthenticated, eventController.getEvents) */

//API endpoint for /events:id
router.route('/events/:id')
/*
  .get(authController.isAuthenticated, eventController.getEventById) */
  //.delete(eventController.delete)

//Should not have get all users open. For dev purposes



app.get('/', function(req, res){
  res.send("The server is up and running")
  console.log("This is working")
})

app.use('/v1', router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
//API endpoint for /users


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err)
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
