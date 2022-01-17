function() {
	var manifest = this.manifest;
	if (!manifest.css) return;
	var parts = [this.component.manifest.name, "Plugins", manifest.name];
	Echo.Utils.addCSS(this.substitute(manifest.css), parts.join("."));
}