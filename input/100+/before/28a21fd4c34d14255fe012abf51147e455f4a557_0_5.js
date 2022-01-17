function (key) {
		var tile = this._tiles[key];

		this.fire("tileunload", {tile: tile, url: tile.src});

		if (this.options.reuseTiles) {
			tile.className = tile.className.replace(' leaflet-tile-loaded', '');
			this._unusedTiles.push(tile);
		} else if (tile.parentNode === this._container) {
			this._container.removeChild(tile);
		}

		tile.src = L.Util.emptyImageUrl;

		delete this._tiles[key];
	}