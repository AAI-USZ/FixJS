function(newVal, oldVal, scope) {
			if (newVal === prevVal) {
				return;
			}
			if (loaded) {
				initialize(newVal);
				if (attrs.multiple !== undefined && !newVal) {
				    // Push the model change to the view(only the null value in this case)
				    elm.select2('val', '');
				}
			}
			prevVal = newVal;
		}