function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.toppingsContext = that.toppingsContext || that.getContext(canvas);

		drawImagePattern(that.toppingsContext, pizza.get('toppings'));
	}