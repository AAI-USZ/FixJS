function()
	{
		if (!this.IsNavigating())
			return;

		this._onNavigationEnded();
		this.StopMoving();

		var curTile = this.GetTile();
		if (!NavigationManager.IsTileClaimedByOthers(curTile, this))
			NavigationManager.ClaimTile(this, curTile);
	}