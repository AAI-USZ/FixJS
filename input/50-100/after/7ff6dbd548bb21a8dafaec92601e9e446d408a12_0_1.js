function() {
		if (!self.cache) self.cache = {};
		if (!self.cache.itemTemplate) {
			self.cache.itemTemplate = $.isFunction(template)
				? template.apply(this, arguments)
				: template;
		}
		return self.cache.itemTemplate;
	}