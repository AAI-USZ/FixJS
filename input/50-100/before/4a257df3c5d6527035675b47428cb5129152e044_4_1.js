function() {
		_.bindAll(this, "geocodeAddress");

		// Create a persistence helper
		this.persistenceHelper = new httpizza.OrderPersistenceHelper();

		// Retrieve the order from session storage
		this.order = this.persistenceHelper.getOrderSession();

		// Redirect the user to the makeline page if the order doesn't have a pizza.
		if (typeof this.order.get('pizza') === 'undefined') {
			window.location = "/orders/makeline";
		}

		// Compile the view template
		this.template = _.template( $("#checkout_template").html() );
	}