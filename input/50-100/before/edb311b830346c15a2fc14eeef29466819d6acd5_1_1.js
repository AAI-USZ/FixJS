function(event) {
	var code = this.convert(event.keyCode, event);
	this.downKeys[""+code] = false;
	
	return event.keyCode == 8 ? false : true;;
}