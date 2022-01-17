function() {
	var self = this;
	var p = self.processing;
	var debugRenderLeft = (self.__debug && self.__debug.extendRender) ? self.__screen.width : 0;
	var frontColour = 255;

	self.__now = p.millis();

	//
	// Update logic
	//

	if (self.__isTraversing)
		self.__isTraversing != self.updateNavigation();

	//
	// Renders
	//

	p.fill(frontColour);

	//
	// Normal render
	//

	// Draw map
	p.image(self.__map, 0, 0);

	//
	// Overlaying debug render
	//
	if (self.__debug && self.__debug.walkState) {
		if (debugRenderLeft > 0) {
			if (self.__debug.overlayState)
				p.image(self.__map, debugRenderLeft, 0);
			else {
				p.pushStyle();

				p.stroke(frontColour);
				p.fill(255 - frontColour);
				p.rect(debugRenderLeft, -1, debugRenderLeft + self.__screen.width, self.__screen.height + 1);

				p.popStyle();
			}
		}

		if (self.__stateMap != null)
			p.image(debugRenderLeft, 0);

		if (self.__goal != null && self.__goal !== undefined) {
			var goal = { x: self.__goal.x + debugRenderLeft, y: self.__goal.y };
			self.drawInfoPoint(goal, "Goal", 0xFF99FF99);
		}

		if (self.__start != null && self.__start !== undefined) {
			var start = { x: self.__start.x + debugRenderLeft, y: self.__start.y };
			self.drawInfoPoint(start, "Start", 0xFF999BFF);
		}

		p.pushStyle();
		p.fill(frontColour);
		p.textAlign(p.LEFT);
		p.text((self.__isTraversing ? "Searching..." : "Stopped"), debugRenderLeft + 15, self.__screen.height - 15);
	}

	// And Frame Rate hoooo yeaaaahhhhh
	if (self.__debug && self.__debug.frameRate) {
		p.textAlign(p.LEFT);
		p.text(p.__frameRate, debugRenderLeft + 15, 15);
	}

	// Prototype warning
	p.pushStyle();
	p.textAlign(p.CENTER);
	p.textSize(14);
	p.text("DEMO PROJECT!", (self.__screen.width / 2) + debugRenderLeft, 25);
	p.popStyle();
}