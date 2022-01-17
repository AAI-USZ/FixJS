function(prop) {
				try {
					var value = context.interpolate(self.properties[prop]);
				} catch (err) {
					throw this.completeError(err);
				}
				
				node[prop] = value;
			}