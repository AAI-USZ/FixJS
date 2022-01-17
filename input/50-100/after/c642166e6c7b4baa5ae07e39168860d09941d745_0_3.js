function(key, value) {
		//Put the value and invalidate all dependent contexts
		var ret;
		if(ret = this.put(key, value) )
			this.invalidate(key);
		return ret;
	}