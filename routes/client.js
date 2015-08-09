var client = require('../schemas/clientSchema')

exports.postClients = function(req, res) {

	var newClient = new client();

	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;

 	//TODO: Do the saving of the client 

}

exports.getClients = function(req, res) {

//Use the find function from the model to tind all clients
}