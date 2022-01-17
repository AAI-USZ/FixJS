function() {
				// find all models in our collection that have us.
				var values_of_us = this.collection.filter(function(m) { return that.id in m.attributes; }).map(function(m) { return to_base_value(m.get(that.id)); });
				entropy = _.uniq(values_of_us).length * 1.0 / values_of_us.length;
				this.set({'entropy': entropy});
			}