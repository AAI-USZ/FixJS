function() {
	return this.manifest.name.toLowerCase().replace(/-/g, "").replace(/\./g, "-");
}