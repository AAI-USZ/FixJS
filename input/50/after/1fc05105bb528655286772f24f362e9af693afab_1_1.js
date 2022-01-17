function() {
	if (TissueStack.phone || TissueStack.tablet) {
		this.buildTabletMenu();
	} else if (TissueStack.desktop) {
		this.buildDynaTree();
	}
}