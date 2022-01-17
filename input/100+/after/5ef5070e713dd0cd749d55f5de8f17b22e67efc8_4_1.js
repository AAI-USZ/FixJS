function()
	{
		var entity = Crafty.e("2D, DOM, Mouse, Body, Damageable, BodyAnimations, DebugRendering, AbilityUser, NavigationHandle, AvoidanceHandle, AI, " + this._getRandomSprite())
			.attr(
			{
				TileWidth:this.Width,
				TileHeight:this.Height,
				IsStatic:false,
				MovementSpeed : this.Speed,
				Faction : this.Faction
			});

		for (var slot in this.Abilities)
		{
			var data = this.Abilities[slot];
			var ability = new data.Type();
			for (var key in data)
			{
				if (key === "Type")
					continue;

				ability[key] = data[key];
			}

			entity.AddAbility(slot, ability);
		}


		this.set({'entity' : entity });
	}