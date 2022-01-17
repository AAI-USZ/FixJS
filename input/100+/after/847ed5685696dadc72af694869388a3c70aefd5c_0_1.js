function(world, x, y)
	{
		if (!this.has("Sprite"))
			throw new Error("Must have Sprite for body!");

		this._world = world;
		this._tileX = x;
		this._tileY = y;


		if (this.IsStatic)
			this._initStaticBody();
		else
			this._initDynamicBody();

		this._updateSpritePos(true);
		this.trigger("Change");
		this.trigger("Appeared");
	}