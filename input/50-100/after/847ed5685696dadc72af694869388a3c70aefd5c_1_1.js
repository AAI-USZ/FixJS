function(x, y)
	{
		var from = this.GetCenterRounded();
		var to = { X: x, Y : y };
		this._pendingPath = NavigationManager.GetPathFinder().FindPath(from, to);
		this._advancePath();
	}