function(event) {
					var locationModels = _(event.get('location').map(function(l) {
						return nameResolver.resolve(l);
					})).flatten();
					if (!locationModels) {
						locationModels = _(event.get('summary').map(function(l) {
							return nameResolver.resolve(l);
						})).flatten();
					}
					return { _oid:event.id, "http://purl.org/NET/c4dm/event.owl#place":locationModels };
				}