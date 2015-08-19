var eventAction = require('../schemas/eventActionSchema')



void myFunction(int x) {

	if (x <= 0){

		System.out.println("We have gotten to the base of the function");
	}

	else {
		myFunction(x - 1);
	}

}


var myFunction = function(int x){

}