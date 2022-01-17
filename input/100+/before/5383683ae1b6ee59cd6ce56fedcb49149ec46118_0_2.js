function (e) {
			var co = e.co,
				pos = e.pos,
				context = e.ctx;
				
			var tileEvent = { co: e.co, pos: e.pos, ctx: e.ctx};
			tileEvent.type = "canvas";
			
			var minX = -Crafty.viewport.x;
			var minY = -Crafty.viewport.y;
			var maxX = minX + Crafty.viewport.width;
			var maxY = minY + Crafty.viewport.height;
			
			var tx = 0,
				ty = 0,
				w = this._tileSize,
				h = this._tileSize;
				
			var i0 = Math.floor(minY / h);
			var i1 = Math.floor(maxY / h);
			var j0 = Math.floor(minX / w);
			var j1 = Math.floor(maxX / w);
			
			if (i0 < 0) i0 = 0;
			if (j0 < 0) j0 = 0;
			if (i1 > this._row - 1) i1 = this._row - 1;
			if (j1 > this._col - 1) j1 = this._col - 1;
			
			for (var i = i0; i <= i1; i++){
				for (var j = j0; j <= j1; j++){
					
					tx = j * w;
					ty = i * h;
					var basedTile = this._tiles[i][j].baseTile;
					if (basedTile !== undefined)
						this.drawTile(tileEvent, basedTile, tx, ty, w, h);

					var tile = this._tiles[i][j];
					this.drawTile(tileEvent, tile, tx, ty, w, h);
					//console.log("Drawing tile: ", tile);
				}
			}
		}