var express = require('express');
var router  = express.Router();
var user    = require('../schemas/userSchema')

/* GET users listing. */
router.get('/', function(req, res, next) {
  user.find(function(err, users) {
            if(err)
                res.send(err)

            res.json(users)

        })
})

module.exports = router;
