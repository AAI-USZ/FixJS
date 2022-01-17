function (mousePos, newZoom) {
		var map = this._map,
			scale = map.getZoomScale(newZoom),
			viewHalf = map.getSize().divideBy(2),
			centerOffset = mousePos.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			newCenterPoint = map._getTopLeftPoint().add(viewHalf).add(centerOffset);

		return map.unproject(newCenterPoint);
	}