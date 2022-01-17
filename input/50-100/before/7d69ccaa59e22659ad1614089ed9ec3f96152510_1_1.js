function(key) {
		var that = this;

		that.create(function() {
			that.db.discard(key, function() {},
			function() {});
		});
	}