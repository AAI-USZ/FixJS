function(name, element, dom, extra) {
	// render specific element
	if (name) {
		var renderer = this.extension.renderers[name];
		if (renderer) {
			var iteration = 0;
			renderer.next = function() {
				renderer.functions[++iteration].apply(this, arguments);
			};
			renderer.functions[iteration].apply(this, [element, dom, extra]);
		}
		return;
	}

	// render the whole control
	this.dom = this.compileTemplate(this.template, this.data || {}, this.extension.template);
	this.config.get("target")
		.addClass(this._cssClassFromControlName())
		.empty()
		.append(this.dom.content);
	this.events.publish({"topic": "onRender"});
	return this.dom.content;
}