function() {
		// Render the template.
		$(this.el).html(this.template());

		// Render the crust by default.
		this.renderCrust();
	}