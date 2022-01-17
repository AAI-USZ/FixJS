function(key) {
		delete this.observable[key];
		delete this._rawData[key];
		delete this._keyDeps[key];
	}