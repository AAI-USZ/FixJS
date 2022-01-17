function()
	{
		// TODO: 1/3 drop hardcoded for now
		if (Crafty.math.randomInt(1, 3) <= 1)
		{
			var tile = this.GetTile();
			Pickups.Spawn(this._world, tile.x, tile.y);
		}

		this._world.RemovePawn(this);
	}