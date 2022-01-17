function(x, y)
	{
		var from = this.GetCenterRounded();
		var to = null;

		if (typeof x === 'object')
		{
			to = { target : x, radius : y };
			to._goalCenter = x.GetCenter();
		}
		else
		{
			to = { x: x, y : y };
		}

		this._currentGoal = to;

		this._pendingPath = NavigationManager.FindPath(from, to);
		this._onNavigationStarted();
		this._advancePath();
	}