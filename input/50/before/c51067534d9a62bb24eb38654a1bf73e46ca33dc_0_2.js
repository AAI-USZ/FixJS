function(attr) {
				var value = context.interpolate(self.attributes[attr]);
				node.setAttribute(attr, value);
			}