function () {
	var self = this;

	if (self.__goal == null) {
		var pos = { x: self.processing.mouseX, y: self.processing.mouseY };
		if (pos.x < self.__screen.width) // Account for when we're extending the canvas
			self.__goal = pos;
	} else if (self.__start == null) {
		var pos = { x: self.processing.mouseX, y: self.processing.mouseY };
		if (pos.x < self.__screen.width) { // Account for when we're extending the canvas
			// Blank any previous state
			self.__state = {};
			self.__stateMap = self.processing.createImage(self.__screen.width, self.__screen.height, self.processing.RGB);
			self.__start = pos;
			self.__isTraversing = true;
		}
	}
}