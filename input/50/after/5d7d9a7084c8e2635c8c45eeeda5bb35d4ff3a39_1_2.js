function (id, amendedNode) {
	if (id === this.cslId) {
		this.titleNode = amendedNode;
		this.updateTitle();
	}
}