function (id, position, node, numAdded) {
	if (this.cslId > -1) {
		return;
	}

	this.titleNode = this.getTitleNode();
	if (this.titleNode !== null) {
		this.cslId = this.titleNode.cslId;
		this.updateTitle();
	}
}