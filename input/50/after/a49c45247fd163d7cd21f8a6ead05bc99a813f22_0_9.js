function(element) {
	return element.addClass(this.cssPrefix + "-wrapper" + (this.depth ? "-child" : "-root"));
}