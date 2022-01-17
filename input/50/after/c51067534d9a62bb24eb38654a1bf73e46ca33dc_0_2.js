function(attr) {
				try {
					var value = context.interpolate(self.attributes[attr]);
				} catch (err) {
					throw this.completeError(err);
				}
				
				node.setAttribute(attr, value);
			}