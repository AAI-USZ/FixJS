function (e) {
		if (!this._moved || !this._zooming) { return; }

		this._zooming = false;
		this._map._mapPane.className = this._map._mapPane.className.replace(' leaflet-touching', ''); //TODO toggleClass util

		L.DomEvent
			.removeListener(document, 'touchmove', this._onTouchMove)
			.removeListener(document, 'touchend', this._onTouchEnd);

		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale),
			centerPoint = this._map.getPixelOrigin().add(this._startCenter).add(centerOffset),
			center = this._map.unproject(centerPoint),

			oldZoom = this._map.getZoom(),
			floatZoomDelta = Math.log(this._scale) / Math.LN2,
			roundZoomDelta = (floatZoomDelta > 0 ? Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),
			zoom = this._map._limitZoom(oldZoom + roundZoomDelta),
			finalScale = Math.pow(2, zoom - oldZoom);

		this._map.fire('zoomanim', {
			center: center,
			zoom: zoom
		});

		this._map._runAnimation(center, zoom, finalScale / this._scale, this._startCenter.add(centerOffset), true);
	}