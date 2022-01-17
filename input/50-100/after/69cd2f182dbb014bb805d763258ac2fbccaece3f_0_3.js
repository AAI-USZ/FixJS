function () {
		if (this._markers.length > 0) {
			this._markers[this._markers.length - 1].off('click', this._finishShape);
			if (L.Browser.touch) {
				this._markers[this._markers.length - 1].off('touchend', this._finishShape);
			}
		}
	}