var user  = require('../schemas/userSchema');

//Posts a user
exports.postUsers = function(req, res) {

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
    });

     newUser.create(req.body, function (err, post) {
        if(err)
            res.json(err)
    
        res.json(body);
    
    
  });

};

//Gets all the users
exports.getUsers = function(req, res) {
    user.find(function(err, users) {
            if(err)
                res.send(err);

            res.json(users);

        });
};

//A certain user ID
exports.getUserById = function(req, res) {
    user.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err)

        res.json(user)
    })

};

//changes a user
exports.putUser = function(req, res) {

};

//deletes a user
exports.deleteUser = function( req, res) {
    
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
    });

     newUser.create(req.body, function (err, post) {

        if(err)
            res.json(err)
    
        res.json(body);
    
    
  });

};