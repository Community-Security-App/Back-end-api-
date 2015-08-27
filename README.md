##Install 

Make sure you have express, node.js, mongodb and npm(manages packages for node)

git clone the repo 

CD into it 

run 'npm install' to get all the dependencies


To run the program run npm start 



##Options for Running

You can run with the mongodb specified in app.js(online connection)

Or you can modify the app.js file have an instance of mongodb running 
locally, or on mongolabs

E.g 

####Locally: 
mongoose.connect('mongodb://localhost/sapp');

###Mongolabs: 

mongoose.connect('mongodb://admin:admin@ds035593.mongolab.com:35593/sapp');


sapp is the name defined in mongodb terminal by the use command i.e use sapp



####Testing 
To test use Postman.
Does not have very helpful response/error messages so far



oauth2 Authentication does not fully work on all the endpoints at the moment


