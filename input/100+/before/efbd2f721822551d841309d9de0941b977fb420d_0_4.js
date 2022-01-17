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
			
			for (i = i0; i <= i1; i++){
				for (j = j0; j <= j1; j++){
					
					tx = j * w;
					ty = i * h;
					//var tile = Crafty.c(this._tileNames[this._tiles[i][j]]);
					var tile = this._tileSprite[this._tiles[i][j]];
					//console.log("Drawing tile: ", tile);

					tileEvent.co.x = tile.__coord[0];
					tileEvent.co.y = tile.__coord[1];
					tileEvent.co.w = tile.__coord[2];
					tileEvent.co.h = tile.__coord[3];
					tileEvent.pos._x = tx;
					tileEvent.pos._y = ty;
					tileEvent.pos._w = w;
					tileEvent.pos._h = h;
					tile.trigger("Draw", tileEvent);
				}
			}
		}