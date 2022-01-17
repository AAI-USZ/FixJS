function(){
		var returnKey = helper.cloneObj(this.key);
		returnKey.value = returnKey.values[0];
		this.key.press = false;
		return returnKey;
	}