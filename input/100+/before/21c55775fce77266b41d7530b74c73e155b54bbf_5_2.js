function(center, radius)
	{
		var result = {};
		result.hits = [];

		var minCell = this._getCell(center.x - radius, center.y - radius);
		var maxCell = this._getCell(center.x + radius, center.y + radius);

		for (var x = minCell.x; x <= maxCell.x; x++)
		{
			for (var y = minCell.y; y <= maxCell.y; y++)
			{
				var list = this._movableMap[x][y];
				for (var i = 0; i < list.length; i++)
				{
					var entity = list[i];
					var totalRadius = radius + entity.GetRadius();
					if (Math3D.DistanceSq(center, entity.GetCenter()) <= totalRadius * totalRadius)
						result.hits.push( { entity : entity } );
				}
			}
		}

		return result;
	}