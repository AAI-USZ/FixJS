function(data)
			{
				var ctx = data.ctx;
				ctx.beginPath();

				var center = this.GetCenterRounded();
				var realCenter = this.GetCenterReal();
				var x = Crafty.viewport.x + (center.x + 0.5) * this._world.TileSize;
				var y = Crafty.viewport.y + (center.y + 0.5) * this._world.TileSize;
				var w = this.TileWidth * this._world.TileSize * 0.5;
				var h = this.TileHeight * this._world.TileSize * 0.5;

				ctx.strokeStyle = NavigationManager.IsTileClaimedBy(center, this) ?
					"red" : "white";

				var pts = [
					[ x - w, y - h ],
					[ x + w, y - h ],
					[ x + w, y + h ],
					[ x - w, y + h ]
				];

				for (var i = 0; i < 4; i++)
				{
					ctx.lineTo(pts[i][0], pts[i][1]);
				}
				//ctx.moveTo(Crafty.viewport.x + realCenter.x, Crafty.viewport.x + realCenter.y);
				//ctx.lineTo(Crafty.viewport.x + x, Crafty.viewport.x + y);
				ctx.closePath();

				var claimed = NavigationManager.GetClaimedTile(this);
				if (claimed != null)
				{
					var cx = Crafty.viewport.x + (claimed.x + 0.5) * this._world.TileSize;
					var cy = Crafty.viewport.y + (claimed.y + 0.5) * this._world.TileSize;
					ctx.moveTo(cx, cy);
					ctx.lineTo(x, y);
				}

				ctx.stroke();
			}