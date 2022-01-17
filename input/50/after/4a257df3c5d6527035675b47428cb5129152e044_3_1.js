function(pizza) {
		// Serialize the pizza object to a JSON string.
		var json = JSON.stringify( pizza.toJSON() );

		// Persist the JSON string to sessionStorage.
		that.setSessionStorage('pizza', json);
	}