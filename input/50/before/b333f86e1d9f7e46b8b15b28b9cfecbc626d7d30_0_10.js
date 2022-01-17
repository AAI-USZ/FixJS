function (point, zoom, unbounded) { // (Point[, Number, Boolean]) -> LatLng
		// TODO remove unbounded, making it true all the time?
		zoom = typeof zoom === 'undefined' ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(point, this.options.scale(zoom), unbounded);
	}