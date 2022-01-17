function(inExcludes) {
		this.map.entities.clear();
		if (this.showPin && this.pin) {
			this.map.entities.push(this.pin);
		}
		if (inExcludes) {
			for (var i=0, ex; ex=inExcludes[i]; i++) {
				if (ex) {
					this.map.entities.push(ex);
				}
			}
		}
	}