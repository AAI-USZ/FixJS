function (id, numDeleted) {
	this.titleNode = this.getTitleNode();
	this.displayTitle();

	if (this.titleNode === null) {
		this.cslId = -1;
	}
}