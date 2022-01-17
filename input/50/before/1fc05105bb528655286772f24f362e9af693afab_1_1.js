function() {
	if (TissueStack.phone) {
		return;
	} else if (TissueStack.desktop) {
		this.buildDynaTree();
	} else if (TissueStack.tablet || TissueStack.phone) {
		this.buildTabletMenu();
	}
}