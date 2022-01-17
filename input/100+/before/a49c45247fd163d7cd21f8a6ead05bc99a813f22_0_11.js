function(element, dom, config) {
	this.render("childrenContainer", element, dom, {
		"filter": function(item) { return item.byCurrentUser; },
		"keepChildren": config && config.keepChildren
	});
}