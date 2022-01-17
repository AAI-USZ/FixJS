function() {
				// find all models in our collection that have us.
				var models_that_have_us = this.collection.filter(function(m) {
					return that.id in m.attributes;
				});
				this.set({'coverage': models_that_have_us.length * 1.0/this.collection.length});
			}