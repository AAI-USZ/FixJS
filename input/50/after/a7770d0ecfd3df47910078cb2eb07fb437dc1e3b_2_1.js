function(name, renderer) {
	this.component.extendRenderer.call(this.component, name, $.proxy(renderer, this));
}