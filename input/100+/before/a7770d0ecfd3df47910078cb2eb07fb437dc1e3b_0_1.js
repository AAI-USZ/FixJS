function(manifest) {
	var control = Echo.Utils.getNestedValue(window, manifest.name);
	// prevent multiple re-definitions
	if (control) return control;
	var _constructor = function(config) {
		var self = this;
		if (!config || !config.target) return;
		this.manifest = manifest;
		this.init([
			"vars",
			"extension",
			["config", config],
			"events",
			"labels",
			"css",
			"renderers",
			["user", function() {
				self.init([["plugins", manifest.constructor]]);
			}]
		]);
	};
	Echo.Utils.inherit(_constructor, manifest.inherits || Echo.Control);
	if (manifest.methods) {
		$.extend(_constructor.prototype, manifest.methods);
	}
	_constructor.prototype.templates = manifest.templates;
	Echo.Utils.setNestedValue(window, manifest.name, _constructor);
	return _constructor;
}