function (map) {

		this._map = map;



		if (!this._image) {

			this._initImage();

		}



		map._panes.overlayPane.appendChild(this._image);



		map.on('viewreset', this._reset, this);



		if (map.options.zoomAnimation) {

			map.on('zoomanim', this._animateZoom, this);

		}



		this._reset();

	}