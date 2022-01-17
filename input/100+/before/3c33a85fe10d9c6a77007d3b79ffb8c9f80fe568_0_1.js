function() {
		if (this.trafficTileLayer) {
			this.map.entities.remove(this.trafficTileLayer);
			this.trafficTileLayer = null;
		}
		if (this.showTraffic) {
			var time = (new Date()).getTime();
			var tileSource = new Microsoft.Maps.TileSource({uriConstructor: 'http://t0.tiles.virtualearth.net/tiles/t{quadkey}?tc=' + time});
			// Construct the layer using the tile source
			this.trafficTileLayer = new Microsoft.Maps.TileLayer({mercator: tileSource, opacity: .7});
			this.map.entities.push(this.trafficTileLayer);
		}
	}