function () {
		// The last marker shold have a click handler to close the polyline
		if (this._markers.length > 1) {
			this._markers[this._markers.length - 1].on('click', this._finishShape, this);
			if (L.Browser.touch) {
				this._markers[this._markers.length - 1].on('touchend', this._finishShape, this);
			}
		}
		
		// Remove the old marker click handler (as only the last point should close the polyline)
		if (this._markers.length > 2) {
			this._markers[this._markers.length - 2].off('click', this._finishShape);
			if (L.Browser.touch) {
				this._markers[this._markers.length - 2].off('touchend', this._finishShape);
			}
		}
	}