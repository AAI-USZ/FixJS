function(world)
	{
		this._world = world;
		this._pathFinders.length = 0;
		this.Semantics = new WorldPathSemantics(world);
		this._interRegionPathFinder = new PathFinder(new InterRegionPathSemantics(world));
		this._pathFinder = new PathFinder(null);

		this._semanticsLoc = new WorldPathSemantics_ToLocation(world);
		this._semanticsTargetTouch = new WorldPathSemantics_ToTargetTouch(world);
		this._semanticsTargetRanged = new WorldPathSemantics_ToTargetRanged(world);
	}