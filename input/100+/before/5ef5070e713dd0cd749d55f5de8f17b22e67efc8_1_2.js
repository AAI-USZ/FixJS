function(from, to)
	{
		to._goal = { x : from.x, y : from.y };

		var target = to.target;
		var targetTile = target.GetCenterRounded();
		var starts = [];

		for (var dx = -1; dx <= 1; dx++)
		{
			var x = targetTile.x + dx;

			for (var dy = -1; dy <= 1; dy++)
			{
				if (dx === 0 && dy === 0)
					continue;

				var y = targetTile.y + dy;

				// TODO: check occupied

				var cost = (dx === 0 || dy === 0) ? 0 : 1.5;
				starts.push({ point : { x : x, y : y }, cost : cost });
			}
		}

		return starts;
	}