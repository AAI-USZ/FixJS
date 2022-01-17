function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.toppingsContext = that.toppingsContext || that.getContext(canvas);

		drawPattern(that.toppingsContext, pizza.get('toppings'));
	}