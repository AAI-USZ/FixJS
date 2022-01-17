function(event) {
	if(document.activeElement.tagName == "INPUT") return;
	
	var code = this.convert(event.keyCode, event);
	this.downKeys[""+code] = false;
	
	return event.keyCode == 8 ? false : true;
}