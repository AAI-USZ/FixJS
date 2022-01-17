function(element) {
	var self = this;
	element.unbind("click").click(function() {
		self.textExpanded = !self.textExpanded;
		self.rerender(["body", "textToggleTruncated"]);
	});
	return this.labels.get("textToggleTruncated" + (this.textExpanded ? "Less" : "More"));
}