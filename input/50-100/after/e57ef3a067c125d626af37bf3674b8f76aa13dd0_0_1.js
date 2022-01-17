function(require) {



	var moduleOne = require('./moduleOne/module');

	var moduleTwo = require('./moduleTwo/module');



	// create an array containing all modules for easy handling

	return [ new moduleOne(), new moduleTwo() ];



}