function(name, args) {
	var renderer = this.extension.renderers[name];
	if (!renderer || !renderer.next) return args[0]; // return DOM element
	return renderer.next.apply(this, args);
}