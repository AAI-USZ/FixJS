function(require) {



	var moduleOne = require('./moduleOne/module');

	var moduleTwo = require('./moduleTwo/module');

	var salesPersonInfo = require('./salesPersonInfo/module');

	var salesInfo = require('./salesInfo/module');



	// create an array containing all modules for easy handling

	return [ new moduleOne(), new moduleTwo(), new salesPersonInfo(), new salesInfo() ];



}