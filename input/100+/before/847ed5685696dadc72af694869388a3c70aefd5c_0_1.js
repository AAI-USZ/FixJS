function(world, x, y)
	{
		if (!this.has("Sprite"))
			throw new Error("Must have Sprite for body!");

		this._world = world;
		this._tileX = x;
		this._tileY = y;

		var pos = this.GetSpritePosAtTile(x, y);
		this.x = pos.X;
		this.y = pos.Y;
		this.z = pos.Z;

		if (this.IsStatic)
			world.AddStaticEntity(this);

		this.trigger("Change");
		this.trigger("Appeared");
	}