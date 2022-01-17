function (e) {
		console.log("Tapped" + (this._map ? "map" : "somewhere"));
		if (e.touches) {
			// This might be a bit greedy
			L.DomEvent.stopPropagation(e);
		}
		var latlng = null;
		if (this._marker) {
			console.log("creating latlng from marker");
			latlng = this._marker.getLatLng();
		}
		console.log("creating latlng from touch " + e.touches.length);
		latlng =  this._map.mouseEventToLatLng(e.changedTouches ? e.changedTouches[0] : e);
		
		console.log("firing now");
		this._map.fire(
			'draw:marker-created',
			{
				marker: new L.Marker(latlng, this.options.icon)
			}
			);
		console.log("fired event");
		this.disable();
	}