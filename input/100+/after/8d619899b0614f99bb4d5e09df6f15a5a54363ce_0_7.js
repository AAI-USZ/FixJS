function (e) {
		if (!this._moved || !this._zooming) { return; }

		var map = this._map;

		this._zooming = false;
		map._mapPane.className = map._mapPane.className.replace(' leaflet-touching', ''); //TODO toggleClass util

		L.DomEvent
			.removeListener(document, 'touchmove', this._onTouchMove)
			.removeListener(document, 'touchend', this._onTouchEnd);

		var origin = this._getScaleOrigin(),
			center = map.layerPointToLatLng(origin),

			oldZoom = map.getZoom(),
			floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
			roundZoomDelta = (floatZoomDelta > 0 ? Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),
			zoom = map._limitZoom(oldZoom + roundZoomDelta);

		map.fire('zoomanim', {
			center: center,
			zoom: zoom
		});

		map._runAnimation(center, zoom, map.getZoomScale(zoom) / this._scale, origin, true);
	}