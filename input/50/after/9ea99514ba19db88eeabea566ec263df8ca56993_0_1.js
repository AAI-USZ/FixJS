function() {
	if (!this.manifest.css) return;
	Echo.Utils.addCSS(
		this.manifest.css.replace(/{prefix}/g, "." + this._cssClassFromControlName()),
		this.manifest.name
	);
}