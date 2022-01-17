function() {
		var to_base_value= function(v) {
			if (v instanceof Backbone.Model) { return v.id; }
			if (v instanceof Object) { throw Error(" cannot base value of object ");  }
			return v.valueOf();
		};

		var PropertyModel = Backbone.Model.extend({
			idAttribute:"_id",
			initialize:function() {
				this.bind("change", function() {
					that._update_entropy();
					that._update_coverage();
				});
			},
			_update_coverage:function() {
				// find all models in our collection that have us.
				var models_that_have_us = this.collection.filter(function(m) {
					return that.id in m.attributes;
				});
				var coverage = models_that_have_us.length * 1.0/this.collection.length;
				this.set({'coverage': coverage});
			}
			_update_entropy:function() {
				// find all models in our collection that have us.
				var values_of_us = this.collection.filter(function(m) {
					return that.id in m.attributes;
				}).map(function(m) {
					return to_base_value(m.get(that.id));
				});
				var entropy = _.uniq(values_of_us).length * 1.0 / values_of_us.length;
				this.set({'entropy': entropy});
			}
		});

		return {
			PropertyModel:PropertyModel
		};
	}