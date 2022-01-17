function()
	{
		var monsters = [ Slime, Ghost ];
		var monster = monsters[Crafty.math.randomInt(0, monsters.length - 1)];
		var spawned = new monster().Appear(this._world, this._tileX, this._tileY);
		var entity = spawned.getEntity();
		var x = this._tileX + Crafty.math.randomInt(-2, 2);
		var y = this._tileY + 1;
		entity.NavigateTo(x, y);
		entity.SetDestinationRegion(this._startingRegion, this._destRegion);
	}