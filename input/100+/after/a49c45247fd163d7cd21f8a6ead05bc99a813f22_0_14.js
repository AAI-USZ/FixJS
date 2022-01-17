function(element, dom, extra) {
	extra = extra || {};
	var data = this.data[extra.field];
	if (!this.config.get("viaLabel.text") ||
			!data.name ||
			data.name === "jskit" ||
			data.name === "echo") {
		return element;
	}
	var a = Echo.Utils.hyperlink({
		"class": "echo-secondaryColor",
		"href": data.uri || this.data.object.permalink,
		"caption": data.name
	}, {
		"openInNewWindow": this.config.get("openLinksInNewWindow")
	});
	return element.html("&nbsp;" + this.labels.get(extra.label + "Label") + "&nbsp;").append(a);
}