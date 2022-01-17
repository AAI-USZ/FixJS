function() {
	var self = this;
	var p = self.processing;
	var debugRenderLeft = (self.__debug && self.__debug.extendRender) ? self.__screen.width : 0;
	var frontColour = 255;

	self.__now = p.millis();

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
				p.fill(255 - frontColour);

				p.rect(debugRenderLeft, 0, debugRenderLeft + self.__screen.width, self.__screen.height);

				p.popStyle();
			}
		}

		if (self.__goal != null && self.__goal !== undefined)
			self.drawInfoPoint(self.__goal, "Goal", 0xFF00FF00);
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