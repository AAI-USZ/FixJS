function() {
		if (!self.vars.cache.itemTemplate) {
			self.vars.cache.itemTemplate = $.isFunction(template)
				? template.apply(this, arguments)
				: template;
		}
		return self.vars.cache.itemTemplate;
	}