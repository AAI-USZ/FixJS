function() {
				// becasue removing a model reindexes, cannot apply that in a normal loop.
				var toRemove = this.collection.filter(function(model) {
					return model.get('completed') == 'completed';
				});

				// grab individual models and remove them.
				this.collection.removeModel(toRemove);
				this.render();
			}