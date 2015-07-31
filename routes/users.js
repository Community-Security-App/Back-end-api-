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
     user.create(req.body, function (err, post) {

    if (err)
    {
        res.send(err)}
    else 
    {
        res.json(post)
        res.json(req.body)
    
    }
  });
});

//Updates a certain user in the database
router.put('/:id', function(req, res, next){
     user.findByIdAndUpdate(req.params.id, req.body, function (err, post){
        if (err)
            res.send(err)
        else
            res.send({"success": "1"})
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
