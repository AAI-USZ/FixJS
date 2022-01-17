function()
	{
		for (var i = 0; i < this._world.Regions.length; i++)
		{
			var region = this._world.Regions[i];
			if (region._spawnPoint != null)
				this.SetCenter(region.Center.x, region.Center.y);
		}
	}