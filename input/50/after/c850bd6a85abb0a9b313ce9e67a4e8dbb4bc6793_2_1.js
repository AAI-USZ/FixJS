function() {
	this.xhr.open('GET', encodeURI(this.url), true); //asynchronous	
	
	//at the moment, ArrayBuffer is the only possible return type
	this.xhr.responseType = "arraybuffer";
	
	this.xhr.send(null);
}