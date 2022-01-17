function(element) {
	var self = this;
	element.hide();
	if (!this.user.is("admin")) {
		return element;
	}
	var mode = "default";
	var setTitle = function(el) {
		element.attr("title", self.labels.get(mode + "ModeSwitchTitle"));
	};
	setTitle();
	element.click(function() {
		mode = (mode === "default" ? "metadata" : "default");
		setTitle();
		self.dom.get("data").toggle();
		self.dom.get("metadata").toggle();
	});
	if (Echo.Utils.isMobileDevice()) {
		element.show();
	}
	return element;
}