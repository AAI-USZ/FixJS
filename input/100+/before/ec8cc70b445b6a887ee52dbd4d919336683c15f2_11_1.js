function( ev, cb){
		// if we can bind to it ...
		if(this.bind){
			this.bind(ev, cb)
		} else {
			$([this]).bind(ev, cb)
		}
		return this;
	}