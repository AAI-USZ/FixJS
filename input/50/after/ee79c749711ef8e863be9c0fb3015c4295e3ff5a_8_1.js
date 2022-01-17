function(require) {



	// create an array containing all modules classes that needs to be initiated
	return {

		moduleOne : require('./moduleOne/module'),

		moduleTwo : require('./moduleTwo/module'),

		salesPersonInfo : require('./salesPersonInfo/module'), 

		salesInfo : require('./salesInfo/module'),

	};



}