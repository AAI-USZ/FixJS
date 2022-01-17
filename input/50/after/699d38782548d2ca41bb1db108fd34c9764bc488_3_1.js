function(str) {
		//localStorage values are always strings, let's make sure we get booleans
		//don't forget to use this!
		if ("false" === str) {
			return false;
		} else if("true" === str) {
			return true;
		} else {
			return str;
		}
	}