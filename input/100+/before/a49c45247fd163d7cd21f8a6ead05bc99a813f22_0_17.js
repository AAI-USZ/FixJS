function(element, dom, extra) {
	if (!this.children.length) return;
	if (!this.hasMoreChildren()) {
		// IE in Quirks mode can't operate with elements with "height: 0px" correctly, 
		// element with "height: 0px" is renderered as though it doesn't have height property at all.
		// Thus we set "height: 1px" as the final value for animate function and simply hide element
		// after the animation is done.
		if ($.browser.msie && document.compatMode != "CSS1Compat") {
			element.animate(
				{
					"height": "1px",
					"marginTop": "hide",
					"marginBottom": "hide",
					"paddingTop": "hide",
					"paddingBottom": "hide"
				},
				{
					"duration": this.config.get("children.moreButtonSlideTimeout"),
					"complete": function() {
						element.hide();
					}
				}
			);
		} else {
			element.slideUp(this.config.get("children.moreButtonSlideTimeout"));
		}
		return;
	}
	var self = this;
	// extra.element is sibling element for more children button
	extra = extra || {};
	// the "show()" jQuery method doesn't work for some reason in Chrome (A:5755)
	element.css("display", "block");
	element.addClass("echo-item-depth-" + (this.depth + 1));
	element.unbind("click").one("click", function() {
		self.render("expandChildrenLabel", dom.get("expandChildrenLabel"), dom, {"state": "loading"});
		self.publish("internal.Item.onChildrenExpand", {"data": self.data});
	});
}