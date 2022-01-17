function(newValue) {
				var index, children, child;
				if (newValue) {
					elm.detach();
				} else if (parent.find(elm).size() === 0) {
					index = elm.data('ui-remove-index');
					children = parent.children();
					if (children.length > 0) {
						for (var i = 0; i < children.length; i++) {
							child = angular.element(children[i]);
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