function() {
	var that = new httpizza.PersistenceHelper();

	that.saveOrderSession = function(order) {
		// Serialize the order object to a JSON string.
		var json = JSON.stringify( order.toJSON() );

		// Persist the JSON string to sessionStorage.
		that.setSessionStorage('order', json);
	};

	that.getOrderSession = function() {
		// Retrieve the order JSON string from sessionStorage.
		var json = that.getSessionStorage('order');

		// Deserialize the JSON string to an Order model object.
		return new httpizza.Order( JSON.parse(json) );
	};

	that.saveOrder = function(order) {

	};

	that.getOrder = function() {

	};

	return that;
}