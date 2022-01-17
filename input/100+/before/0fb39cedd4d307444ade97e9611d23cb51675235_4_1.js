function(start, end)
	{
		var result = {};
		result.hits = [];

		var minCell = this._getCell(Math.min(start.x, end.x), Math.min(start.y, end.y));
		var maxCell = this._getCell(Math.max(start.x, end.x), Math.max(start.y, end.y));

		for (var x = minCell.x; x <= maxCell.x; x++)
		{
			for (var y = minCell.y; y <= maxCell.y; y++)
			{
				var list = this._movableMap[x][y];

				for (var i = 0; i < list.length; i++)
				{
					var entity = list[i];
					if (this._lineBoxIntersect(start, end, entity.GetBoundingBox()))
						result.hits.push( { entity : entity } );
				}
			}
		}

		return result;
	}