function(x, y)
	{
		var from = this.GetCenterRounded();
		var to = { x: x, y : y };
		this._pendingPath = NavigationManager.GetPathFinder().FindPath(from, to);
		this._advancePath();
	}