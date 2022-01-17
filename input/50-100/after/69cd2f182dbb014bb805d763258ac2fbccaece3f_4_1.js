function () {
		// The first marker shold have a click handler to close the polygon
		if (this._markers.length === 1) {
			this._markers[0].on('click', this._finishShape, this);
			if (L.Browser.touch) {
				this._markers[0].on('touchend', this._finishShape, this);
			}
		}
	}