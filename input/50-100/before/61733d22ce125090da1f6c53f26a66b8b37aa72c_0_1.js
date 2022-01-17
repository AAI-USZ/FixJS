function(obj) {
		var clone = {};
		for(var i in obj) {
			if(typeof(obj[i]) === "object") {
				clone[i] = cloneObject(obj[i]);
			} else {
				clone[i] = obj[i];
			}
		}
		return clone;
	}