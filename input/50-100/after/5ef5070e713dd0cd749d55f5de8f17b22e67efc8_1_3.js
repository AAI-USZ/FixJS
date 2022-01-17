function(entity, from, to)
	{
		var semantics = null;
		if (to.target)
		{
			semantics = to.radius > 0 ? this._semanticsTargetRanged : this._semanticsTargetTouch;
		}
		else
		{
			semantics = this._semanticsLoc;
		}

		this._pathFinder.Semantics = semantics;
		return this._pathFinder.FindPath(entity, from, to);
	}