function() {
			var this_ = this;
			this.collection = this.options.model || new Backbone.Collection();
			this.row_views = {};
			this.collection.bind("add", function(x) {this_._handle_add(x); });
			this.collection.bind("remove", function(x) { this_._handle_remove(x); });
			this.render();
			this.options.columns = this.options.columns || [
				function(m) { return (new ItemView({model:m})).render(); },
				function(m) {
					return _(m.attributes).keys().map(
						function(x) {
							var start = Math.max(0,x.lastIndexOf('/') + 1,x.lastIndexOf('#') + 1);
							return x.slice(start);
						}).join(',');
				},
				function(m) {
					if (! m.get_chain) { return 'model does not have \'get_chain\' method'; }
					var vals = m.get_chain(['latitude','longitude']);
					if (vals && vals.length > 0) {
						return util.t("<%= latitude %>, <%= longitude %>", vals[0].attributes);
					} else {
						var names = m.get_chain(['place name']);
						if (names && names.length > 0) {
							return names[0].get('place name');
						} else {
							return 'could not chain to lat/long or place name';
						}
					}
					return ' ? ';
				}];

		}