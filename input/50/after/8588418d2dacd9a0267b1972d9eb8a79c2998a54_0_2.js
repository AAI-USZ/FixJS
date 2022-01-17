function() {
				propertyChangeHandler.apply({
					tgt: target,
					src: source,
					attr: attr || defaultAttr(target, TRUE), // attr for binding data value to the element
					fn: linkFn,
					view: view
				}, arguments);
			}