function(data) {
	this.instance.data = $.extend(this.config.get("data"), data || {});
	this.jxhrInstance = $.ajax(this.instance);
}