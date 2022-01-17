function(canvas, include_cross_hair) {
	this.canvas = canvas;
	this.setIncludeCrossHair(include_cross_hair);
	this.registerCommonEvents();
	if (TissueStack.desktop || TissueStack.debug) {
		this.registerDesktopEvents();
	}
	if (TissueStack.tablet || TissueStack.phone) {
		this.registerMobileEvents();
	}
}