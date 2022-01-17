function () {
		this._mapPane.className = this._mapPane.className.replace(/ leaflet-pan-anim/g, '');
		this.fire('moveend');
	}