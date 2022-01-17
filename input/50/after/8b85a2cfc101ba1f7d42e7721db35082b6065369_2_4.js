function(entity, current, dest)
	{
		var goal = dest._goal;
		return current.x == goal.x && current.y == goal.y;
	}