function(){
		var returnKey = helper.cloneObj(this.key);
		if(this.key.press){
			this.key.press = false;
		}
		return returnKey;
		// if (this.key.press){
			// this.key.press = false;
			// return {value: this.key.value, down: this.key.down, press: true};
		// } else {
			// return this.key;
		// }
	}