function(args) {
	args = args || {};
	var dom = args.dom || this.dom;
	var data = args.data || this.data;
	var target = args.target ||
			(args.element && dom.get(args.element)) ||
			this.config.get("target");

	// render specific element
	if (args.element && !args.recursive) {
		var renderer = this.extension.renderers[args.element];
		if (renderer) {
			var iteration = 0;
			renderer.next = function() {
				iteration++;
				return renderer.functions.length > iteration
					? renderer.functions[iteration].apply(this, arguments)
					: target;
			};
			return renderer.functions[iteration].call(this, target, dom, args.extra);
		}
		return target;
	}

	// render element including its content recursively
	if (args.element && args.recursive) {
		var template = $.isFunction(this.template) ? this.template() : this.template;
		var html = this.substitute(template, data);
		var newNode = $("." + this.cssPrefix + args.element, $(html));
		var oldNode = this.dom.get(args.element);
		newNode = Echo.Utils.toDOM(newNode, this.cssPrefix + "-",
			function(element, target, dom) {
				control.render.call(control, {
					"element": element,
					"target": target,
					"dom": dom,
					"extra": extra
				});
			}
		).content;
		oldNode.replaceWith(newNode);
		return newNode;
	}

	// render template
	if (args.template) {
		var dom = this.compileTemplate(args.template, args.data);
		target.empty().append(dom.content);
		return dom.content;
	}

	// render the whole control
	var topic = this.dom ? "onRerender" : "onRender";
	this.dom = this.compileTemplate(this.template, this.data, this.extension.template);
	target.empty().append(this.dom.content);
	this.events.publish({"topic": topic});
	return this.dom.content;
}