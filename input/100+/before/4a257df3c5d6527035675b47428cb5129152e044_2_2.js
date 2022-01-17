function(ingredients) {
	// Create a new CanvasHelper in order to extend its functionality.
	var that = new httpizza.CanvasHelper();

	// Offsets and radius for drawing circular shapes and patterns.
	that.xoffset = 150;
	that.yoffset = 150;
	that.radius  = 130;

	// Color brushes for pizza sauces.
	var sauceBrushes = {
		'Pizza Sauce': 'rgb(222, 0, 0)',
		'Pesto': 'rgb(127, 161, 21)',
		'BBQ Sauce': 'rgb(105, 25, 0)',
		'Hot Sauce': 'rgb(255, 0, 0)',
		'Sour Cream': 'rgb(255, 255, 255)'
	};

	/**
	* Draws a pizza's crust onto the canvas.
	*/
	that.drawCrust = function(canvas, pizza) {
		var crust = ingredients.filterByName(pizza.get('crust'))[0];
		var imageUrl = crust.get('brush_image');

		var imageObj = new Image();

		imageObj.onload = function() {
			that.crustContext = that.crustContext || that.getContext(canvas);
			that.clearCanvas(canvas);
			that.crustContext.drawImage(imageObj, 0, 0);
		};

		imageObj.src = imageUrl;
	};

	/**
	* Draws a pizza's sauce onto the canvas.
	*/
	that.drawSauce = function(canvas, pizza) {
		var sauce = pizza.get('sauce');

		that.clearCanvas(canvas);

		if (typeof sauce !== 'undefined') {
			var color = sauceBrushes[ pizza.get('sauce') ];

			that.sauceContext = that.sauceContext || that.getContext(canvas);

			that.drawFilledCircle(that.sauceContext, that.xoffset, that.yoffset, that.radius, color);			
		}
	};

	/**
	* Draws a pizza's cheeses onto a canvas.
	*/
	that.drawCheese = function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.cheeseContext = that.cheeseContext || that.getContext(canvas);

		drawPattern(that.cheeseContext, pizza.get('cheeses'));
	};

	/**
	* Draws a pizza's toppings onto a canvas.
	*/
	that.drawToppings = function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.toppingsContext = that.toppingsContext || that.getContext(canvas);

		drawPattern(that.toppingsContext, pizza.get('toppings'));
	};

	/**
	* Draws ingredients using a context.
	*/
	function drawPattern(context, ingredientNames) {
		_.each(ingredientNames, function(name) {
			var ingredient = ingredients.filterByName(name)[0];
			var imageUrl = ingredient.get('brush_image');
			var imageObj = new Image();

			imageObj.onload = function() {
				var pattern = context.createPattern(imageObj, "repeat");
				that.drawFilledCircle(context, that.xoffset, that.yoffset, that.radius + 10, pattern);
			};

			imageObj.src = imageUrl;
		});
	}

	return that;
}