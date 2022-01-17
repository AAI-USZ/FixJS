function(callback) {
		for (var i=0; i<this.length; i++) {
            var key = this._keys[i];
			callback(key, this._values[key]);
		}
	}