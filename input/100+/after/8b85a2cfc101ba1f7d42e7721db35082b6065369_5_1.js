function(entity)
	{
		var centerTile = entity.GetTile();

		var bounds = this._getBounds(centerTile, entity.TileWidth, entity.TileHeight);
		var minCell = bounds.min;
		var maxCell = bounds.max;

		for (var x = minCell.x; x <= maxCell.x; x++)
		{
			for (var y = minCell.y; y <= maxCell.y; y++)
				this._movableMap[x][y].push(entity);
		}

		var entry =
		{
			center : centerTile,
			min : minCell,
			max : maxCell
		};

		entity._collisionMapEntry = entry;
		var map = this;
		entity.bind("BodyMoved", function() { map._updateEntity(this); } );
	}