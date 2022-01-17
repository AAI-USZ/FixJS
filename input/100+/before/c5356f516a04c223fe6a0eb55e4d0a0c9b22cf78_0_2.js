function () {
	var self = this;

	if (self.__goal == null) {
		var pos = { x: self.processing.mouseX, y: self.processing.mouseY };
		if (pos.x < self.__screen.width) // Account for when we're extending the canvas
			self.__goal = pos;
	}
}