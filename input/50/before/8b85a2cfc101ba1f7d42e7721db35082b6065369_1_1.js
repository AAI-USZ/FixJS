function(x, y)
	{
		var tileX = (x / this._world.TileSize) - 0.5;
		var tileY = (y / this._world.TileSize) - 0.5;
		return { x : tileX, y : tileY };
	}