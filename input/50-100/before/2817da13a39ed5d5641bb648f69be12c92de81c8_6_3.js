function() {
		try {
			var doc = this.getDocument(), surface = (doc && doc.annotationSurface);
			if (surface) {
				surface.destroy();
			}
		} catch(err) { /*Do nothing*/ }
		dojo.forEach(this._cxtConns, connect.disconnect);
		dojo.forEach(this._cxtSubs, connect.unsubscribe);
		if (doc) {
			delete doc.annotationSureface;
		}
	}