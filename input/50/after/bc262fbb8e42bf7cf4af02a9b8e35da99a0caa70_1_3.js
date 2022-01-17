function(callback) {
		for (var i=0; i<this.length; i++) {
            var key = this._keys[i];
			callback(this._values[key]);
		}
	}