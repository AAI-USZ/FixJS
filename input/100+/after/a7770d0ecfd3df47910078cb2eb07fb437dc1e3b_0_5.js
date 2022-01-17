function(name, extra) {
	var control = this;
	extra = extra || {};

	// no DOM available yet, nothing to rerender -> exit
	if (!this.dom) return;

	// rerender the whole control
	if (!name) {
		if (this.dom) {
			this.dom.content.replaceWith(this.render());
			this.events.publish({"topic": "onRerender"});
		}
		return;
	}

	// if the list of elements passed, call rerender for each element
	if ($.isArray(name)) {
		$.map(name, function(element) {
			control.rerender(element, extra);
		});
		return;
	}

	// exit if no element found
	if (!name || !this.dom.get(name)) return;

	if (extra.recursive) {
		var template = $.isFunction(this.template) ? this.template() : this.template;
		var html = this.substitute(template, this.data || {});
		var newNode = $("." + cssPrefix + name, $(html));
		var oldNode = this.dom.get(name);
		newNode = Echo.Utils.toDOM(newNode, this.cssPrefix + "-",
			function(name, element, dom) {
				control.render.call(control, name, element, dom, extra);
			}
		).content;
		oldNode.replaceWith(newNode);
	} else {
		this.render(name, this.dom.get(name), this.dom, extra);
	}
}