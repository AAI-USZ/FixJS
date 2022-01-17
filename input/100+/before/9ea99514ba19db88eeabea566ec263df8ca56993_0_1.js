function() {
	// TODO: provide the ability to render 1 specific element
	var control = this;
	var target = $(this.config.get("target"));
	// TODO: set specific CSS class...
	var templates = {};
	templates.raw = $.isFunction(this.template) ? this.template() : this.template;
	templates.processed = $(this.substitute(templates.raw, this.data || {}));
	templates.processed.find("*").andSelf().each(function(i, element) {
		element = $(element);
		var renderer = element.data("renderer");
		if (renderer && control.renderers[renderer]) {
			control.renderers[renderer][0].apply(control, [element]);
		}
	});
	target.empty().append(templates.processed);
}