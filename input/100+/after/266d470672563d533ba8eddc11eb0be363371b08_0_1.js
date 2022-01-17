function(ctx, tmpl) {
		var fragment = this.createDocumentFragment(),
			outer = this.value,
			value = ctx.value;
		
		if (value && Array.isArray(value)) {
			value.forEach(function(item, index) {
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
				
				fragment.appendChild(tmpl.render(ctx.createContext(xitem)));
				
				if (xitem === item) {
					delete item.loop;
				}
			});
		}
		
		return fragment;
	}