function (e) {
		this._isDrawing = true;
		
		this._updateLabelText({
			text: 'Release ' + (L.Browser.touch ? 'finger' : 'mouse') + ' to finish drawing.'
		});

		this._startLatLng = this._map.mouseEventToLatLng(e.touches ? e.touches[0] : e);
		
		if (e.touches) {
			L.DomEvent.stopPropagation(e);
		}
		

		L.DomEvent
		.addListener(document, 'mouseup', this._onMouseUp, this)
		.preventDefault(e);
		
		if (L.Browser.touch) {
			L.DomEvent
			.addListener(document, 'touchend', this._onMouseUp, this);
		}
	}