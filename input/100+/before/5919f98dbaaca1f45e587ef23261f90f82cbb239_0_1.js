function(pm, util) {
		var PropertyCollection = Backbone.Collection.extend({
			model:PropertyModel,

			// Order models by their coverage, with higher coverage first.
			comparator: function(model) {
				return -model.coverage();
			},
			initialize:function() {
				var this_ = this;
				util.assert(this.options.collection, "No collection passed");
				this.options.collection.bind('change', function(m) { this_._changed(m); });
				this.options.collection.map(function(m) { this_._changed(m); });
			},
			_changed:function(model){
				var that = this;
				_(model.attributes).map(function(val, key) {
					if (_.isUndefined(that.get(key))) {
						var p = new pm.PropertyModel({_id:key});
						that.add(p);
					}
					that.get(key).trigger("change");
				});
			}
		});			
		return {  PropertyCollection:PropertyCollection	};
}