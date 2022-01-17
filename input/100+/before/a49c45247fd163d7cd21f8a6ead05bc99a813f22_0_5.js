function(entry, isLive) {
	var self = this;
	var item = new Echo.StreamServer.Controls.Stream.Item({
		"target": $("<div>"),
		"appkey": this.config.get("appkey"),
		"parent": this.config.getAsHash(),
		"plugins": this.config.get("plugins"),
		"data": entry,
		"live": isLive
	});
	// caching item template to avoid unnecessary work
	var template = item.template;
	item.template = function() {
		if (!self.vars.cache.itemTemplate) {
			self.vars.cache.itemTemplate = $.isFunction(template)
				? template.apply(this, arguments)
				: template;
		}
		return self.vars.cache.itemTemplate;
	};
	this.items[entry.unique] = item;
	return item;
}