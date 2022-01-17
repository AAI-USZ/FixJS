function removeEventListener (type, handler) {
		if (this.events[type]) {
			for (var i = 0, 
					 et = this.events[type], 
					 etl = et.length; i < l; i++) {
				if (et[i] === handler) {
					this.events[type] = et.slice(0, i == 0 ? 0 : i  >= etl ? etl - 1 : i)
									 	  .concat(et.slice(i + 1, etl));
					break;
				}
			}
		}
	}