function (id, numDeleted) {
	this.titleNode = this.getTitleNode();
	this.updateTitle();

	if (this.titleNode === null) {
		this.cslId = -1;
	}
}