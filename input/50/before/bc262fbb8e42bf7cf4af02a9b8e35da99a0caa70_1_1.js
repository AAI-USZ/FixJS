function(callback) {
		for (var key in this._keys) {
			callback(key, this._values[key]);
		}
	}