function()
	{
		this.requires('Pawn');
		this.bind("EnterFrame", this._updateHero);
		return this;
	}