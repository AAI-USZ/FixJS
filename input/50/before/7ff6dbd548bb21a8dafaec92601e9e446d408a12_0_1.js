function(plugin, spec) {
	if (!this.buttonSpecs[plugin]) {
		this.buttonSpecs[plugin] = [];
	} else {
		return;
	}
	this.buttonSpecs[plugin].push(spec);
}