function() {
				iteration++;
				return renderer.functions.length > iteration
					? renderer.functions[iteration].apply(this, arguments)
					: element;
			}