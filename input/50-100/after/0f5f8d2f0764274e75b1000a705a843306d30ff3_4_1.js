function(oldObj, newObj) {
		if(typeof oldObj != "number") {
			var idx = jQuery.inArray( oldObj, this);
			if(idx > -1) {
				this.splice(idx, 1, newObj);
			}
		}else{
			this.splice(oldObj, 1, newObj);
		}
		if(this.parent) Gibberish.dirty(this.parent);
	}