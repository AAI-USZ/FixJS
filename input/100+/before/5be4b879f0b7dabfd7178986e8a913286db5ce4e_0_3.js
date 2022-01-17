function(ctx, tmpl) {
		var fragment = tmpl.document.createDocumentFragment(),
			outer = this;
		
		if (ctx.value && Array.isArray(ctx)) {
			ctx.value.forEach(function(item, index) {
				var xitem;
				
				if (item !== null && (typeof item === 'object' || typeof item === 'array')) {
					xitem = item;
					item.loop = {
						index: index,
						outer: outer
					};
				} else {
					xitem = {
						toString: function() { return item.toString(); },
						loop: {
							index: index,
							outer: outer
						}
					};
				}
				
				fragment.appendChild(tmpl.render(xitem));
				
				if (xitem === item) {
					delete item.loop;
				}
			});
		}
		
		return fragment;
	}