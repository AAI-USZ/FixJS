function() {
	var that = new httpizza.PersistenceHelper();

	that.savePizzaSession = function(pizza) {
		// Serialize the pizza object to a JSON string.
		var json = JSON.stringify( pizza.toJSON() );

		// Persist the JSON string to sessionStorage.
		that.setSessionStorage('pizza', json);
	};

	that.getPizzaSession = function() {
		// Retrieve the pizza JSON string from sessionStorage.
		var json = that.getSessionStorage('pizza');

		// Create a new pizza model and pass it the json object (properties)
		return new httpizza.Pizza( JSON.parse(json) );
	};

	that.saveOrder = function(order) {

	};

	that.getOrder = function() {

	};

	return that;
}