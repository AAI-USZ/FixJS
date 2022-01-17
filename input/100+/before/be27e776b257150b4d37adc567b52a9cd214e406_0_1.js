function(newValue, oldvalue) {
				var index, children, child;
				if (newValue) {
					elm.detach(); 
				} else if (!$.contains(parent, elm)) {
					index = elm.data('ui-remove-index');
					children = elm.parent().children();
					if (children.length > 0) {
						for (var i = 0; i < children.length; i++) {
							child = children[i];
							if (index > child.index() && i === children.length-1) {
								child.after(elm);
							} else {
								child.before(elm);
							}
						}
					} else {
						parent.append(elm);
					}
				}
			}