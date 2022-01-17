function(element, dom, extra) {
	if (!extra || !extra.name) return;
	var template = extra.template ||
		'<a class="{class:control} {class:control}-{data:name}">{data:label}</a>';
	var data = {
		"label": extra.label || "",
		"name": extra.name
	};
	var control = $(this.substitute(template, data));
	var clickables = $('.echo-clickable', control);
	if (!clickables.length) {
		clickables = control;
		control.addClass('echo-clickable');
	}
	clickables[extra.onetime ? "one" : "bind"]({
		"click": function(event) {
			event.stopPropagation();
			if (extra.callback) extra.callback();
		}
	});
	if (Echo.Utils.isMobileDevice()) clickables.addClass("echo-linkColor");
	return control;
}