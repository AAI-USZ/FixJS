function() {
				propertyChangeHandler.apply({ tgt: target, src: source, attr: attr, fn: linkFn, view: view }, arguments);
			}