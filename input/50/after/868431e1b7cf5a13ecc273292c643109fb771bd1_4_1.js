function(key) {
		delete this.observable[key];
		delete this._keyDeps[key];
		var val = this._rawData[key];
		delete this._rawData[key];
		return val;
	}