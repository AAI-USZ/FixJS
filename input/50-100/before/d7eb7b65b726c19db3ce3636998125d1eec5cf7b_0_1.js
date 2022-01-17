function(config) {
	this.config = new Echo.Configuration(config, {
		"data": {},
		"uri": "",
		"secure": false,
		"onData": function() {},
		"onOpen": function() {},
		"onClose": function() {},
		"onError": function() {}
	});
	this.instance = this._getInstance();
}