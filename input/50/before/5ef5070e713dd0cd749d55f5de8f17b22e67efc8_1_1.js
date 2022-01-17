function()
	{
		if (!this.has("Body"))
			throw new Error("Must have body to move around!");
		this.bind("MoveFinished", this._movePointReached);
		this.bind("EnterFrame", this._updateNavigation);
		return this;
	}