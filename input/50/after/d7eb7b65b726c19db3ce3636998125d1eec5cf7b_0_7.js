function() {
	var settings = this.constructor.parent._getTransportObject.call(this);
	delete settings.xhr;
	settings.dataType = "jsonp";
	return settings;
}