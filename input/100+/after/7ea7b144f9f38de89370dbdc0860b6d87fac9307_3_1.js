function (map) {

		this._map = map;



		map.on('viewreset', this.update, this);



		this._initIcon();

		this.update();



		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {

			map.on('zoomanim', this._animateZoom, this);

			this._icon.className += ' leaflet-zoom-animated';

			if (this._shadow) {

				this._shadow.className += ' leaflet-zoom-animated';

			}

		} else {

			this._icon.className += ' leaflet-zoom-hide';

			if (this._shadow) {

				this._shadow.className += ' leaflet-zoom-hide';

			}

		}

	}