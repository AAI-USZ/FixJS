function(oldObj, newObj) {
		if(typeof oldObj != "number") {
			var idx = this.indexOf( oldObj );
			if(idx > -1) {
				this.splice(idx, 1, newObj);
			}
		}else{
			this.splice(oldObj, 1, newObj);
		}
	}