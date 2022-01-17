function ready(context) {
				var components = context.components;
				if(components.hasOwnProperty('$exports')) {
					context.components = components.$exports;
				}

				return context;
			}