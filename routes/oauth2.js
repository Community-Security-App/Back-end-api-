var oauth2orize = require('oauth2orize')
var user = require('../schemas/userSchema')
var client = require('../schemas/clientSchema')
var token = require('../schemas/tokenSchema')
var code = require('../schemas/codeSchema')

//Create the oauth2orize
var server = oauth2orize.createServer();


//serilize function
server.serializeClient(function(client, callback) {
	return callback(null, client._id)
})

//Deserialize function 
server.deserializeClient(function(id, callback) {
	client.findOne({_id: id}, function (err, client) {
		if (err) {return callback(err); }
		return callback(null, client);
	});
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, callback) {

	var code = new Code({
		value: uid(16), 
		clientId: client._id, 
		redirectUri: redirectUri,
		userId: user._id
	});

	code.save(function(err) {
		if (err) {return callback(err); }

		callback(null, code.value);
	});
}));

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
	code.findOne({value: code}, function (err, authCode) {
		if (err) { return callback(err); }
		if (authCode == undefined) { return callback(null, false); }
		if (client._id.toString() !== authCode.clientId) {return callback(null, false); }
		if (redirectUri != authCode.redirectUri) {return callback(null, false); }

		authCode.remove(function (err) {
			if(err) {return callback(err); }

			var token = new Token({
				value: uid(256),
				clientId: authCode.clientId, 
				userId: authCode.userId
			});

			token.save(function (err) {
				if (err) {return callback(err); }

				callback(null, token);
			});
		});
	});
}));

exports.authorization = [
	server.authorization(function(clientId, redirectUri, callback) {
		client.findOne({id: clientId}, function (err, client) {
			if (err) {return callback(err); }

			return callback(null, client, redirectUri);
		});
	}),
	function(req, res) {
		res.send({"We got here": "We got here"})
		res.render('dialog', {transactionID: req.oauth2.transactionID, user:req.user, client:req.oauth1.client});
	}]

exports.decision = [
		server.decision()
]

exports.token = [
	server.token(),
	server.errorHandler()
	]

function uid(len) {
	var buf = []
	, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	, charlen = chars.length;

	for (var i = 0; i < len; i ++) {
		buf.push(chars[getRandomInt(0, charlen - 1)]);
	}
	return buf.join('')
};

function getRandomInt(min, max) {
	return Math.floor(Math.Random() * (max - min + 1)) + min;

}