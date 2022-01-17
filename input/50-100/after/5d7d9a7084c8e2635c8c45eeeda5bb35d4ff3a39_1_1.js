function (element) {
	this.element = element;

	this.titleNode = this.getTitleNode();
	if (this.titleNode === null) {
		this.cslId = -1;
	} else {
		this.cslId = this.titleNode.cslId;
	}
	this.element.html('<h3><span cslid=' + this.cslId + '/></h3>').css({cursor: "default"});
	this.updateTitle();
}