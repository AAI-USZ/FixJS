function(key, value) {
		var self = this;
		if(self._rawData[key] === value)
			return false; //The value is unchanged
		if(!self._keyDeps[key])
			return self.add(key, value); //The key needs to be added first
		
		//Set the value and invalidate all dependent contexts
		self._rawData[key] = value;
		for(var cid in self._keyDeps[key])
			self._keyDeps[key][cid].invalidate();
		return true;
	}