function() {
	this.xhr.open('GET', encodeURI(this.url), true); //asynchronous	
	this.xhr.send(null);
}