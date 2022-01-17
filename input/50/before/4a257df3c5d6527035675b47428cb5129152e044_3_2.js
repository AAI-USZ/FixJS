function() {
		// Retrieve the order JSON string from sessionStorage.
		var json = that.getSessionStorage('order');

		// Deserialize the JSON string to an Order model object.
		return new httpizza.Order( JSON.parse(json) );
	}