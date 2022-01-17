function(template, data, transformations) {
	var control = this, templates = {};
	templates.raw = $.isFunction(template) ? template.call(this) : template;
	templates.processed = this.substitute(templates.raw, data || {});
	if (transformations) {
		templates.dom = $("<div/>").html(templates.processed);
		$.map(transformations, function(transformation) {
			templates.dom = control._templateTransformer.call(control, {
				"data": data || {},
				"template": templates.dom,
				"transformation": transformation
			});
		});
		templates.processed = templates.dom.html();
	}
	return Echo.Utils.toDOM(templates.processed, this.cssPrefix + "-", function() {
		control.render.apply(control, arguments);
	});
}