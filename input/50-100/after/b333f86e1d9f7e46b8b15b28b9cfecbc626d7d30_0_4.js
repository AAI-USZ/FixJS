function (offset) {
		var newPos = L.DomUtil.getPosition(this._mapPane).subtract(offset);
		L.DomUtil.setPosition(this._mapPane, newPos);
	}