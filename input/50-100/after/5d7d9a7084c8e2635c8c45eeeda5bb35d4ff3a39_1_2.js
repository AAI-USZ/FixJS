function () {
	var title;

	if (this.titleNode === null) {
		title = "No title";
	} else {
		title = this.titleNode.textValue;
		// TODO: Elide text
	}
	this.element.find('span[cslid]').html(title).attr('cslid', this.cslId);
}