function(callback) {
		for (var key in this._keys) {
			callback(this._values[key]);
		}
	}