function() {
		try {
			if (this.surface) {
				this.surface.destroy();
				delete this.surface;
			}
		} catch(err) { /*Do nothing*/ }
		dojo.forEach(this._cxtConns, connect.disconnect);
		dojo.forEach(this._cxtSubs, connect.unsubscribe);
	}