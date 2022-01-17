function (e) {
		this._endLatLng = this._map.mouseEventToLatLng(e);

		this._fireCreatedEvent();
		
		this.disable();
	}