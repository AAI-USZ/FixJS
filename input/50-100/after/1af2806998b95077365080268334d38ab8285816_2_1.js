function() {
	var tl = this.tl,
		length = this.width/tl.view.width;
	this.length = length;
	tl.view.length = length * tl.length;
}