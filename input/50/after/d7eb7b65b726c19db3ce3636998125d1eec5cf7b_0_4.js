function(data) {
	this.transportObject.data = $.extend(this.config.get("data"), data || {});
	this.jxhrTransportObject = $.ajax(this.transportObject);
}