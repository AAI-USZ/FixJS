function (e) {
		if (!e.touches || e.touches.length !== 2) { return; }

		var map = this._map;

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1.add(p2).divideBy(2, true).subtract(this._startCenter);

		if (this._scale === 1) { return; }

		if (!this._moved) {
			map._mapPane.className += ' leaflet-zoom-anim leaflet-touching';

			map
				.fire('movestart')
				.fire('zoomstart')
				._prepareTileBg();

			this._moved = true;
		}

		var origin = this._getScaleOrigin(),
			center = map.layerPointToLatLng(origin);

		map.fire('zoomanim', {
			center: center,
			zoom: map.getScaleZoom(this._scale)
		});

		// Used 2 translates instead of transform-origin because of a very strange bug -
		// it didn't count the origin on the first touch-zoom but worked correctly afterwards

		map._tileBg.style[L.DomUtil.TRANSFORM] =
			L.DomUtil.getTranslateString(this._delta) + ' ' +
            L.DomUtil.getScaleString(this._scale, this._startCenter);

		L.DomEvent.preventDefault(e);
	}