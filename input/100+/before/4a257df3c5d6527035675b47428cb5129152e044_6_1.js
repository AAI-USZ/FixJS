function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "render", "renderCrust", "renderSauce", "renderCheese", "renderToppings");

		// Create an instance of a canvas helper module.
		this.canvasHelper = new httpizza.PizzaCanvasHelper(this.options.ingredients);

		// Create an instance of a persistence helper module.
		this.persistenceHelper = new httpizza.OrderPersistenceHelper();

		// Get a reference to the pizza from the constructor agruments (this.options)
		// and bind the pizza's individual change events to the respective event handlers.
		this.pizza = this.options.pizza;
		this.pizza.bind("change:crust", this.renderCrust);
		this.pizza.bind("change:sauce", this.renderSauce);
		this.pizza.bind("change:cheeses", this.renderCheese);
		this.pizza.bind("change:toppings", this.renderToppings);

		// Compile the view template.
		this.template = _.template( $("#pizza_template").html() );
	}