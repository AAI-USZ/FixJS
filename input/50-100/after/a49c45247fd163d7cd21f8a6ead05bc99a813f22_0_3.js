function(element, dom) {
	var self = this;
	var get = function(field) {
		return (self.data[field].name || "").toLowerCase();
	};
	if (get("source") === get("provider")) {
		return element;
	}
	return this.render("viaText", element, dom, {
		"label": "via",
		"field": "provider"
	});
}