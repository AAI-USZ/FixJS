function(index, key, value) {
		if (this.has_key(key)) {
			throw "Key[" + key + "] already exists";
		};

		this._keys.splice(index, 0, key);	
		this._values[key] = value;
		this.length++;
	}