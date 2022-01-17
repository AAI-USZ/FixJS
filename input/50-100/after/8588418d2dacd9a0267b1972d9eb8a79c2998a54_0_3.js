function(store, name, item, process) {
		if (item && store === $templates) {
			item.link = function() {
				return $.link.apply(item, arguments);
			};
			if (name) {
				$.link[name] = item.link;
			}
		}
	}