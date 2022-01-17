function(key, block) {
		if (this.has_key(key)) {
			return this.get(key); 
		} else {
			if (block === undefined) return null;
			
			if (isFunction(block)) {
				return block(key);
			} else {
				return block;
			}
		}
	}