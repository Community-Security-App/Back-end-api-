// all the user requests will be located here
var express = require('express');
var router  = express.Router();
var user    = require('../schemas/userSchema')

/* GET all the users */
router.get('/', function(req, res, next) {
  user.find(function(err, users) {
            if(err)
                res.send(err)

            res.json(users)

        })
})

/* Returns a user with a certain id */
router.get('/:uid', function(req, res, next) {
	user.find(req.param.uid, function(err, user) {
		if (err)
			res.send(err)

		res.json(user)
	})
})

/* Creates a new user */
router.post('/', function(req, res, next) {

	var newUser = new user({
		first_name: req.body.first_name,
		last_name:  req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		is_staff: req.body.is_staff,
		is_superuser: req.body.is_superuser,
		is_active: req.body.isactive,
		last_login: req.body.last_login,
		date_joined: req.body.date_joined
	})

	newUser.save(function(err){
		if (err) 
			res.send(err)

		res.json({"success": "1"})
	})
})

//Updates a certain user in the database
router.put('/:id', function(req, res, next){
     user.findByID(req.params.id, function (err, user){
        if (err)
            res.send(err)
        
        user.first_name: req.body.first_name,
        user.last_name:  req.body.last_name,
        user.email: req.body.email,
        user.password: req.body.password,
        user.is_staff: req.body.is_staff,
        user.is_superuser: req.body.is_superuser,
        user.is_active: req.body.isactive,
        //last_login: req.body.last_login, // This should never really change
        //date_joined: req.body.date_joined

        res.json({"success": "1"})
    })
})

// Deletes a particular item from the dbase
router.delete('/:uid', function(req, res, next) {
    user.findByIdAndRemove(req.param.uid, function(err){
        if (err)
            res.send(err)

        res.json({"success": "1"})
    })

})
module.exports = router;
