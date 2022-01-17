function(item, acc) {
		var template = item.length > limit
			? '<span title="{data:item}">{data:truncatedItem}</span>'
			: '<span>{data:item}</span>';
		var truncatedItem = $.htmlTextTruncate(item, limit, "...");
		acc.push(self.substitute(template, {"item": item, "truncatedItem": truncatedItem}));
	}