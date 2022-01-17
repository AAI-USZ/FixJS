function(x, y)
	{
		var from = this.GetCenterTile();
		var to = { X: x, Y : y };
		var path = NavigationManager.GetPathFinder().FindPath(from, to);
	}