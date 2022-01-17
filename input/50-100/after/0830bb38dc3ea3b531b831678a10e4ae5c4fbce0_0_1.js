function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map._panes.overlayPane.appendChild(this._image);

		map.on('zoomanim', this._zoomAnimation, this);
		map.on('viewreset', this._reset, this);
		this._reset();
	}