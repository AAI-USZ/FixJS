function()
	{
		var entity = Crafty.e("2D, DOM, Mouse, Body, Damageable, BodyAnimations, AbilityUser, NavigationHandle, AI, " + this._getRandomSprite())
			.attr(
			{
				TileWidth:this.Width,
				TileHeight:this.Height,
				IsStatic:false,
				MovementSpeed : this.Speed,
				Faction : Factions.Ghost
			})
			.AddAbility("Primary", new Ability_Shoot());

		this.set({'entity' : entity });
	}