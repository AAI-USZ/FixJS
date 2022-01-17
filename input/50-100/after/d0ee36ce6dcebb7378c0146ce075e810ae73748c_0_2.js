function(object) {
			var grid = this.grid;

			var dfd = new Deferred();
			if (object.dir) {
				dfd = Deferred.when(this.store.getChildren(object), function(children) {  // TODO:  I think we can use memory store directly because they are already loaded
					//grid.renderArray(children)
					// cache.query() always queries the master store -> no caching!
					grid.set('query', {
						parId: object.id
					});
				});
			}
			else {
				dfd.resolve(object);
			}
			return dfd;
		}