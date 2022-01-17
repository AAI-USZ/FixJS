function() {
		_.bindAll(this, "geocodeAddress");

		// Create a persistence helper
		this.persistenceHelper = new httpizza.PizzaPersistenceHelper();

		// Retrieve the order from session storage
		var pizza = this.persistenceHelper.getPizzaSession();

		// Redirect the user to the makeline page if the order doesn't have a pizza.
		if (typeof pizza === 'undefined') {
			window.location = "/orders/makeline";
		}

		this.order = new httpizza.Order({ pizza: pizza });

		// Compile the view template
		this.template = _.template( $("#checkout_template").html() );
	}