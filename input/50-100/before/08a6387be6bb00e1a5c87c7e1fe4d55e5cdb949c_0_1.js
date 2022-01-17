function() {
	var manifest = this.manifest;
	if (!manifest.css) return;
	Echo.Utils.addCSS(this.substitute(manifest.css), "plugins-" + manifest.name);
}