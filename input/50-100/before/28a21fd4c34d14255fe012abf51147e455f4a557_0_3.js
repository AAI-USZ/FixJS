function () {
		this._restoreTileFront();

		L.Util.falseFn(this._tileBg.offsetWidth);
		this._resetView(this._animateToCenter, this._animateToZoom, true, true);

		this._mapPane.className = this._mapPane.className.replace(' leaflet-zoom-anim', ''); //TODO toggleClass util
		this._animatingZoom = false;
	}