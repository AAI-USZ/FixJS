function(item, index) {
				var xitem;
				
				if (item !== null && (typeof item === 'object' || Array.isArray(item))) {
					xitem = item;
					item.loop = {
						first: index == 0,
						index: index,
						last: index == value.length - 1,
						length: value.length,
						outer: outer
					};
				} else {
					xitem = {
						toString: function() { return item.toString(); },
						loop: {
							first: index == 0,
							index: index,
							last: index == value.length - 1,
							length: value.length,
							outer: outer
						}
					};
				}
				
				fragment.appendChild(tmpl.render(ctx.createContext(xitem)));
				
				if (xitem === item) {
					delete item.loop;
				}
			}