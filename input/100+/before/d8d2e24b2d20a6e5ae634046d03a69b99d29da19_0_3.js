function (ctx, coords) {
		// start coords to tile 'space'
		var s = ctx.tile.multiplyBy(this.options.tileSize), p, x, y;

		// actual coords to tile 'space'
		p = this._map.project(new L.LatLng(coords[1], coords[0]));

		// point to draw		
		x = Math.round(p.x - s.x);
		y = Math.round(p.y - s.y);
		return {
			x: x,
			y: y
		};
	}