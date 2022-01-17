function (e) {
		var layerPoint = this._map.mouseEventToLayerPoint(e.touches ? e.touches[0] : e),
		latlng = this._map.mouseEventToLatLng(e.touches ? e.touches[0] : e);
		
		if (e.touches) {
			L.DomEvent.stopPropagation(e);
		}


		this._updateLabelPosition(layerPoint);

		if (this._isDrawing) {
			this._updateLabelPosition(layerPoint);
			this._drawShape(latlng);
		}
	}