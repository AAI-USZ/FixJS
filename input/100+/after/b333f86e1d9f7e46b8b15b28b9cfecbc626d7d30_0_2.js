function (layer) {
		var id = L.Util.stamp(layer);

		if (!this._layers[id]) { return; }

		layer.onRemove(this);

		delete this._layers[id];

		// TODO looks ugly, refactor
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum--;
			layer.off('load', this._onTileLayerLoad, this);
		}

		return this.fire('layerremove', {layer: layer});
	}