function (event) {

		// Inheritance innerHide
		that.parent.innerHide(event);
		
		// Updates aria values
		that.$content.attr("aria-hidden", "true");

		return that;
	}