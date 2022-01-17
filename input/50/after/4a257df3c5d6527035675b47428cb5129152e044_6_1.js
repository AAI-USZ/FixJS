function() {
		// Render the template.
		$(this.el).html(this.template());

		// Draw the pizza layers
		this.renderCrust();
		this.renderSauce();
		this.renderCheese();
		this.renderToppings();
	}