var user  = require('../schemas/userSchema');

//Posts a user
exports.postUsers = function(req, res) {

     newUser = new user();
    
        newUser.firstName = req.body.first_name,
        newUser.lastName = req.body.last_name,
        newUser.email  =req.body.email,
        newUser.password = req.body.password,
        newUser.username = req.body.username,
        newUser.isStaff =req.body.is_staff,
        newUser.isSuperuser = req.body.is_superuser,
        newUser.isActive = req.body.is_active,
        newUser.lastLogin = new Date(),
        newUser.dateJoined = new Date()
        

     newUser.save(function(err) {
        if(err)
            res.send(err)
    
        res.json(newUser);
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
    user.findById(req.params.id, function(err, user) {
        if(err)
            res.send(err)

        for (prop in req.body) {
            user[prop] = req.body[prop]
        }

        user.save(function(err){
            if(err)
                res.send(err)

            res.json({"Sucess" : "User Updated"})
        })
    })

};
//deletes a user
exports.deleteUser = function( req, res) {
        user.findByIdAndRemove(req.params.id, function(err, user) {
            if(err)
                res.send(err)

            res.json({"Sucess": "User removed"})
        })

};