function(start, end)
	{
		this._destinationRegion = end;

		var path = NavigationManager.GetInterRegionPathFinder().FindPath(this._entity, start, end);
		this._marchingPath = [];
		// skip first one (start region)
		for (var i = 1; i < path.length; i++)
		{
			var region = path[i];
			this._marchingPath.push(region.Center);
		}

		if (this._marchingPath.length > 0)
			this.IsActive = true;
	}