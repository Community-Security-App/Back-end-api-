// all the user requests will be located here
var express = require('express');
var router  = express.Router();
var user    = require('../schemas/userSchema')


/* returns all the users */
router.get('/', function(req, res, next) {
  user.find(function(err, users) {
            if(err)
                res.send(err)

            res.json(users)

        })
})


/* Returns a user with a certain id */
router.get('/id', function(req, res, next) {
	user.find(req.params.id, function(err, user) {
        console.log(req.params.id)
		if (err)
			res.send(err)

		res.json(user)
	})
})


/* Creates a new user */
router.post('/', function(req, res, next) {

    newUser = new user({
    first_name: req.body.first_name,
    last_name:  req.body.last_name,
    email: req.body.email,
    password: req.password,
    is_staff: req.is_staff,
    is_superuser: req.is_superuser,
    is_active: req.is_active,
    last_login: Date,
    date_joined: Date
    })

     newUser.create(req.body, function (err, post) {


    if (err)
    {
        res.send(err)}
    else 
    {
        //res.json(post)
        res.json(body)
    
    }
  });
});

//Updates a certain user in the database
router.put('/:id', function(req, res, next){
     user.findByIdAndUpdate(req.params.id, req.body, function (err, post){
        if (err)
            res.send(err)
        else
            res.send(post)
    })
}) 

// Deletes a particular item from the dbase
router.delete('/:id', function(req, res, next) {
    user.findByIdAndRemove(req.params.id, function(err, post){
        if (err)
            res.send(err)

        res.json(post)
    })

})
module.exports = router;
