function(element) {
	var self = this;
	this._assembleButtons();
	this._sortButtons();
	element.empty();
	$.map(this.buttonsOrder, function(name) {
		var data = self.buttons[name];
		if (!data || !data.name || !data.visible()) {
			return;
		}
		self.render({
			"element": "_buttonsDelimiter",
			"target": element
		});
		self.render({
			"element": "_button",
			"target": element,
			"extra": data
		});
	});
	return element;
}