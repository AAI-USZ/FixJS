function (map) {

		this._map = map;



		map.on('viewreset', this.update, this);



		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {

			map.on('zoomanim', this._animateZoom, this);

		}



		this._initIcon();

		this.update();

	}