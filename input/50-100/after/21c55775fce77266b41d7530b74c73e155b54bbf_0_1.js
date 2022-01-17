function(x, y)
	{
		var oldCenter = this.GetCenter();
		this._tileX = x - (this.TileWidth - 1) / 2.0;
		this._tileY = y - (this.TileHeight - 1) / 2.0;
		this.trigger("BodyMoved", { from : oldCenter, to : { x : x, y : y } } );
	}