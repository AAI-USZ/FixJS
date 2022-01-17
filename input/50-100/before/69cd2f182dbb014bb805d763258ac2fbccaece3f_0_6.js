function () {
		if (this._markers.length > 0) {
			this._markers[0].off('click', this._finishShape);
			this._markers[0].off('touchend', this._finishShape);
		}
	}