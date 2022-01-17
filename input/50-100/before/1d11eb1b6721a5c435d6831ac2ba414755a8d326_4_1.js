function(canvas) {
	this.canvas = canvas;
	this.registerCommonEvents();
	if (TissueStack.desktop || TissueStack.debug) {
		this.registerDesktopEvents();
	}
	if (TissueStack.tablet || TissueStack.phone) {
		this.registerMobileEvents();
	}
}