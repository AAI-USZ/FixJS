function() {
	var plugin = this;
	var labels = {
		"set": function(labels) {
			Echo.Labels.set(labels, "Plugins." + plugin.name, true);
		},
		"get": function(label) {
			return Echo.Labels.get(label, "Plugins." + plugin.name);
		}
	};
	if (plugin.manifest.labels) {
		labels.set(plugin.manifest.labels);
	}
	return labels;
}