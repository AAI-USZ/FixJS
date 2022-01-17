function (map) {
		map
			.off('layeradd', this._onLayerAdd)
			.off('layerremove', this._onLayerRemove);

	}