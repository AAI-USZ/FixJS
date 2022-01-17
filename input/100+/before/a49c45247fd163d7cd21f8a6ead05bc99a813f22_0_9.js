function(element) {
	var self = this;
	element.hide();
	if (!this.user.is("admin")) return;
	var mode = "default";
	var setTitle = function(el) {
		el.attr("title", self.labels.get(mode + "ModeSwitchTitle"));
	};
	setTitle(element);
	element.click(function() {
		mode = (mode == "default" ? "metadata" : "default");
		setTitle(element);
		self.dom.get("data").toggle();
		self.dom.get("metadata").toggle();
	});
	if (Echo.Utils.isMobileDevice()) element.show();
}