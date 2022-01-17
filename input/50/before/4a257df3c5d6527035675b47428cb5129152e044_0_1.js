function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "index", "loadViews");

		// Create a new Pizza and Ingredients collection.
		this.pizza = new httpizza.Pizza();
		this.ingredients = new httpizza.Ingredients();
	}