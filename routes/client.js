var client = require('../schemas/clientSchema')

exports.postClients = function(req, res) {

	var newClient = new client();

	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;

 	//TODO: Do the saving of the client 

 	client.save(function (err) {
 		if (err)
 			res.send(err);

 		res.json({"message" : "Client added"})
 	})

}

exports.getClients = function(req, res) {

	client.find({userId: req.user._id}, function(err, clients) {
		if (err)
			res.send(err);

		res.json(clients)
	});



//Use the find function from the model to tind all clients
};