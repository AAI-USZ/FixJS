function(key, block) {
		if (this.has(key)) {
			return this._values[key];
		} else {
			if (block === undefined) return null;
			
			if (isFunction(block)) {
				return block();
			} else {
				return block;
			}
		}
	}