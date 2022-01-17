function () {
		var map = this._map,
			delta = Math.round(this._delta),
			zoom = map.getZoom();

		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;

		if (!delta) { return; }

		var newCenter = this._getCenterForScrollWheelZoom(this._lastMousePos, delta),
			newZoom = zoom + delta;

		map.setView(newCenter, newZoom);
	}