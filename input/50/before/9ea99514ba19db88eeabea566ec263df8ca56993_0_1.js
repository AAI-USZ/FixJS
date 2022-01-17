function() {
	if (!this.manifest.css) return;
	Echo.Utils.addCSS(this.manifest.css, this.manifest.name);
}