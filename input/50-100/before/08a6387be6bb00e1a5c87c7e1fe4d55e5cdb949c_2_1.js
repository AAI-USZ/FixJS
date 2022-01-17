function(element) {
	var content = this.config.get("data.object.content");
	if (content) {
		element.val(content);
	}
	return element.iHint({
		"text": this.config.get("actionString"),
		"className": "echo-secondaryColor"
	});
}