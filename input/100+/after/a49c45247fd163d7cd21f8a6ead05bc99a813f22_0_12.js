function(element, dom, config) {
	return this.render("childrenContainer", element, dom, {
		"filter": function(item) { return !item.byCurrentUser; },
		"keepChildren": config && config.keepChildren
	});
}