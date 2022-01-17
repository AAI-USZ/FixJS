function () {
	var title;

	if (this.titleNode === null) {
		title = "No title";
	} else {
		title = this.titleNode.textValue;
		// TODO: Elide text
	}
	this.element.html('<h3><span cslid=' + this.cslId + '>' + title + '</span></h3>');
}