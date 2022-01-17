function()
		{
			//if (this._x === undefined || this._y === undefined)
			//	return;
			var center = this.GetCenterReal();
			var x0 = center.x - Crafty.viewport.width / 2,
				y0 = center.y - Crafty.viewport.height / 2;
			if (x0 < 0) x0 = 0;
			if (y0 < 0) y0 = 0;
//			if (x0 + Crafty.viewport.width > tileMap._width)
//				x0 = tileMap._width - Crafty.viewport.width;
//			if (y0 + Crafty.viewport.height > tileMap._height)
//				y0 = tileMap._height - Crafty.viewport.height;
			Crafty.viewport.x = -x0;
			Crafty.viewport.y = -y0;
		}