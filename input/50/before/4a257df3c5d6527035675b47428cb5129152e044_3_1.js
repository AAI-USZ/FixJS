function(order) {
		// Serialize the order object to a JSON string.
		var json = JSON.stringify( order.toJSON() );

		// Persist the JSON string to sessionStorage.
		that.setSessionStorage('order', json);
	}