function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			p2 = map.mouseEventToLayerPoint(e.touches[1]),
			viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2).divideBy(2, true);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		L.DomEvent
			.addListener(document, 'touchmove', this._onTouchMove, this)
			.addListener(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	}