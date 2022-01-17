function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.cheeseContext = that.cheeseContext || that.getContext(canvas);

		drawImagePattern(that.cheeseContext, pizza.get('cheeses'));
	}