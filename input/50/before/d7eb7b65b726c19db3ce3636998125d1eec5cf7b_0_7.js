function() {
	var settings = this.constructor.parent._getInstance.call(this);
	delete settings.xhr;
	settings.dataType = "jsonp";
	return settings;
}