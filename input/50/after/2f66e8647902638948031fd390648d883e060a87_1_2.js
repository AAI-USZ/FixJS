function (layer) {

		this._deinitEvents(layer);



		L.LayerGroup.prototype.removeLayer.call(this, layer);



		this.invoke('unbindPopup');

	}