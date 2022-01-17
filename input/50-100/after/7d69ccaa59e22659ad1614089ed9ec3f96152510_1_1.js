function(key, callback) {
		var that = this;

		that.create(function() {
			that.db.discard(key, function() {
				if(callback && callback.onSuccess) {
					callback.onSuccess();
				}
			},
			function() {
				if(callback && callback.onFailure) {
					callback.onFailure();
				}
			});
		});
	}