function(entity)
	{
		var entry = entity._collisionMapEntry;
		if (!entry)
			throw ("No collision map entry found, entity must be added first before updating!");

		var newCenter = entity.GetCenterRounded();
		var oldCenter = entry.center;
		if (newCenter.x != oldCenter.x || newCenter.y != oldCenter.y)
		{
			var bounds = this._getBounds(newCenter, entity.TileWidth, entity.TileHeight);

			// remove
			for (var x = entry.min.x; x <= entry.max.x; x++)
			{
				var xInNewBounds = x >= bounds.min.x && x <= bounds.max.x;
				for (var y = entry.min.y; y <= entry.max.y; y++)
				{
					var yInNewBounds = y >= bounds.min.y && y <= bounds.max.y;
					if (!xInNewBounds || !yInNewBounds)
					{
						var list = this._movableMap[x][y];
						var idx = list.indexOf(entity);
						if (idx === -1)
							throw ("somehow entity is not in the list!");
						list.splice(idx, 1);
					}
				}
			}

			// insert
			for (var x = bounds.min.x; x <= bounds.max.x; x++)
			{
				var xInOldBounds = x >= entry.min.x && x <= entry.max.x;
				for (var y = bounds.min.y; y <= bounds.max.y; y++)
				{
					var yInOldBounds = y >= entry.min.y && y <= entry.max.y;
					if (!xInOldBounds || !yInOldBounds)
					{
						this._movableMap[x][y].push(entity);
					}
				}
			}

			entry.center = newCenter;
			entry.min = bounds.min;
			entry.max = bounds.max;
		}
	}