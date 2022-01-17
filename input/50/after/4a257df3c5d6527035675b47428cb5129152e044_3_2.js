function() {
		// Retrieve the pizza JSON string from sessionStorage.
		var json = that.getSessionStorage('pizza');

		// Create a new pizza model and pass it the json object (properties)
		return new httpizza.Pizza( JSON.parse(json) );
	}