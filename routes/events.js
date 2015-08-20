var uEvent = require('../schemas/eventsSchema');


//Endpoint for all the get

exports.postEvents = function(req, res) {

    var newEvent = new uEvent();

    newEvent.description = req.body.description,
    newEvent.threatLevel = req.body.threatLevel,
    newEvent.location    = req.body.location,
    newEvent.latitude    = req.body.latitude,
    newEvent.longitude   = req.body.longitude,
    newEvent.occurenceTime = req.body.occurenceTime,
    newEvent.reportedTime  = new Date(),
    //TODO: Get the Id of the user and store it into reported by 
    newEvent.upvoteCount   = req.body.upvoteCount,
    newEvent.downvoteCount = req.body.downvoteCount,
    newEvent.flagCount     = req.body.flagCount,
    newEvent.deleted       = req.body.deleted,
    newEvent.flagged      = req.body.flagged

    newEvent.save(function(err) {
        if (err)
            res.send(err);

        res.json({"success" : 1});

    });
};

// End point for all the GET 
exports.getEvents = function(req, res) {

    uEvent.find(function (err, uevent) {
        if(err)
            res.send(err);

        res.json(uevent);
    });
};

//Endpoint to get an event with a certain ID 
exports.getEventById = function(req, res) {
    uEvent.findById(req.params.id, function(err, uevent) {
        if(err)
            res.send(err);

        res.json(uevent);

    });
}

//Endpoint to change 