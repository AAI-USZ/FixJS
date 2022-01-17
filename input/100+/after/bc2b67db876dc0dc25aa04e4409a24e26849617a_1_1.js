function(template) {
	var plugin = this;
	return plugin.component.substitute(template, {}, {
		"plugin.label": function(key) {
			return plugin.labels.get(key, "");
		},
		"plugin.class": function(value) {
			return plugin.cssPrefix + "-" + value;
		},
		"plugin.data": function(key) {
			// TODO: to be developed...
		},
		"plugin.self": function(key) {
			// TODO: to be developed...
		}
	});
}