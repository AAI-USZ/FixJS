function(element, dom, extra) {
	var self = this;
	var type = (extra || {}).type;
	if (!this.data.object[type] || !this.user.is("admin")) {
		dom.remove(element);
		return element;
	}
	var limit = this.config.get("parent.limits." + type);
	var items = $.foldl([], this.data.object[type], function(item, acc) {
		var template = item.length > limit
			? '<span title="{data:item}">{data:truncatedItem}</span>'
			: '<span>{data:item}</span>';
		var truncatedItem = $.htmlTextTruncate(item, limit, "...");
		acc.push(self.substitute(template, {"item": item, "truncatedItem": truncatedItem}));
	});
	return element.prepend(items.sort().join(", "));
}