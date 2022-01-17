function() {
	for(var i = 0; i < this.length; i++) {
		delete this[i];
	}
	this.length = 0;
}