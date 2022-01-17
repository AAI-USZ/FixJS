function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.cheeseContext = that.cheeseContext || that.getContext(canvas);

		drawPattern(that.cheeseContext, pizza.get('cheeses'));
	}