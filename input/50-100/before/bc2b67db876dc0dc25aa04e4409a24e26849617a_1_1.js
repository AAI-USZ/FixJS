function() {
	// TODO: append all labels...
	var plugin = this;
	return {
		"set": function(labels) {
			Echo.Lables.set(labels, "Plugins." + plugin.name, true);
		},
		"get": function(label) {
			return Echo.Lables.get(label, "Plugins." + plugin.name);
		}
	};
}