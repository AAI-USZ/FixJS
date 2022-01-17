function(v) {
			if (v instanceof Backbone.Model) { return v.id; }
			if (v instanceof Object) { throw Error(" cannot base value of object ");  }
			return v.valueOf();
		}