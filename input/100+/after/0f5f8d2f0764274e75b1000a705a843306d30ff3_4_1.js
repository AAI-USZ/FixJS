function(arg) {
		console.log("REMOVE REMOVE REMOVE");
		if(typeof arg === "undefined") { // clear all
			for(var i = 0; i < this.length; i++) {
				delete this[i];
			}
			this.length = 0;
		}else if(typeof arg === "number") {
			this.splice(arg,1);
		}else if(typeof arg === "string"){ // find named member and remove
			console.log("STRING")
			for(var i = 0; i < this.length; i++) {
				
				var member = this[i];
				if(member.type === arg) {
					console.log("DIE");
					this.splice(i,1);
				}
				// if(member.name === arg) {
				// 	this.splice(i, 1);
				// }
			}
		}else if(typeof arg === "object") {
			var idx = jQuery.inArray( arg, this);
			if(idx > -1) {
				this.splice(idx,1);
			}
		}
		if(this.parent) Gibberish.dirty(this.parent);
	}