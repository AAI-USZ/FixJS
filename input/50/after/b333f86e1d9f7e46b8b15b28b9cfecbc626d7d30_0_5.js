function (point, zoom, unbounded) { // (Point, Number[, Boolean]) -> LatLng
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint, unbounded);
		//TODO get rid of 'unbounded' everywhere
	}