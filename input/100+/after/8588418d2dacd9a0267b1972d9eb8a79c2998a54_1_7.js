function TmplObject(markup, options, parent, key) {
		// Template object constructor

		// nested helper function
		function extendStore(storeName) {
			if (parent[storeName]) {
				// Include parent items except if overridden by item of same name in options
				tmpl[storeName] = $extend($extend({}, parent[storeName]), options[storeName]);
			}
		}

		options = options || {};
		var tmpl = {
			markup: markup,
			tmpls: [],
			links: [],
			render: renderContent
		};

		if (parent) {
			if (parent.templates) {
				tmpl.templates = $extend($extend({}, parent.templates), options.templates);
			}
			tmpl.parent = parent;
			tmpl.name = parent.name + "[" + key + "]";
			tmpl.key = key;
		}

		$extend(tmpl, options);
		if (parent) {
			extendStore("templates");
			extendStore("tags");
			extendStore("helpers");
			extendStore("converters");
		}
		return tmpl;
	}