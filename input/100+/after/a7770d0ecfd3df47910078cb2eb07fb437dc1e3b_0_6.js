function(args) {
	var classify = {
		"insertBefore": "before",
		"insertAfter": "after",
		"insertAsFirstChild": "prepend",
		"insertAsLastChild": "append",
		"replace": "replaceWith"
	};
	var action = classify[args.transformation.action];
	if (!action) return args.template;
	var html = args.transformation.html;
	var anchor = args.transformation.anchor;
	var content = $.isFunction(html) ? html() : html;
	$("." + anchor, args.template)[action](this.substitute(content, args.data));
	return args.template;
}