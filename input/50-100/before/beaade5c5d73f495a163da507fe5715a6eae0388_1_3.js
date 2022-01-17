function(world)
	{
		this._world = world;
		this._pathFinders.length = 0;
		this._semantics = new WorldPathSemantics(world);
		this._interRegionPathFinder = new PathFinder(new InterRegionPathSemantics(world));
	}