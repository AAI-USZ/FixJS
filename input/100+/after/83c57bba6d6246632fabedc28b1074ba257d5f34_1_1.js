function (object) {
	var keys = Object.keys(this), tempResult,
		i = 0;
	
	for (i; i < keys.length; i++) {
		if (object[keys[i]] === "undefined") {
			return false;
		}
		
		if (this[keys[i]] instanceof Object) {
			tempResult = this[keys[i]].equal(object[keys[i]]);
			if (!tempResult) {
				return false;
			}
		} else if (!(this[keys[i]] instanceof Function)) {
			if (object[keys[i]] !== this[keys[i]]) {
				return false;
			}
		}
	}
	
	return true;
}