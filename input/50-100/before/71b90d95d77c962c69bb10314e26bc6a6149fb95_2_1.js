function() {
	for(var i = 0; i < arguments.length; i++) {
		var obj = arguments[i];
		var shouldAdd = true;
		for(var j = 0; j < this.length; j++) {
			if(obj.name === this[j].name) {
				shouldAdd = false;
			}
		}
		if(shouldAdd) {
			this.push(obj);
		}
	}
}