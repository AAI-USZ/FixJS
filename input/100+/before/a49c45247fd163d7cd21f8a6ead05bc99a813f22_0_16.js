function(element, dom, extra) {
	if (!this.children.length || !this.hasMoreChildren()) return;
	extra = extra || {};
	extra.state = extra.state || "regular";
	var states = {
		"loading": {
			"css": "echo-item-message-loading",
			"label": "loading"
		},
		"regular": {
			"css": "echo-linkColor echo-message-icon",
			"label": "childrenMoreItems"
		}
	};
	element
		.removeClass(states[extra.state == "loading" ? "regular" : "loading"].css)
		.addClass(states[extra.state].css)
		.html(this.labels.get(states[extra.state].label));
}