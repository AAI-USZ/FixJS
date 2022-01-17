function (mousePos, delta) {
		var map = this._map,
			scale = Math.pow(2, delta),
			viewHalf = map.getSize().divideBy(2),
			centerOffset = mousePos.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			newCenterPoint = map.getPixelOrigin().add(viewHalf).add(centerOffset);

		return map.unproject(newCenterPoint);
	}