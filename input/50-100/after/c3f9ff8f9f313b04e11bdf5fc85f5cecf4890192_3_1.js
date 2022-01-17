function(){
		this.key.press = this.pressed[0];
		var returnKey = helper.cloneObj(this.key);
		returnKey.value = returnKey.values[0];
		this.pressed[0] = false;
		// if (returnKey.values.length > 0) {
			// returnKey.value = returnKey.values[0];
		// }
		return returnKey;
	}