function(element, dom) {
	var self = this;
	element.removeClass(
		$.map(["child", "root", "child-thread", "root-thread"],	function(suffix) {
			return self.cssPrefix + "-container-" + suffix;
		}).join(" ")
	);
	var threadSuffix = this.threading ? "-thread" : "";
	if (this.depth) {
		element.addClass(this.cssPrefix + "-container-child" + threadSuffix);
		element.addClass("echo-trinaryBackgroundColor");
	} else {
		element.addClass(this.cssPrefix + "-container-root" + threadSuffix);
	}
	element.addClass(this.cssPrefix + "-depth-" + this.depth);
	var switchClasses = function(action) {
		$.map(self.controlsOrder, function(name) {
			if (!self.controls[name].element) return;
			self.controls[name].clickableElements[action + "Class"]("echo-linkColor");
		});
	};
	if (!Echo.Utils.isMobileDevice()) {
		element.unbind(["mouseleave", "mouseenter"]).hover(function() {
			if (self.user.is("admin")) {
				dom.get("modeSwitch").show();
			}
			switchClasses("add");
		}, function() {
			if (self.user.is("admin")) {
				dom.get("modeSwitch").hide();
			}
			switchClasses("remove");
		});
	}
	return element;
}