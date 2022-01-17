function(children, parent) {
	var self = this;
	var wrapper = $("<div class='echo-item-children-wrapper'></div>");
	var getIdx = function(item) { return self.getItemListIndex(item, parent.get("children")); };
	$.each(children, function(i, item) {
		item.render();
		var insertion = i > 0 && getIdx(children[i-1]) < getIdx(item)
			? "append"
			: "prepend";
		wrapper[insertion](item.dom.content);
	});
	return wrapper;
}