function()
	{
		var sprite = "";
		if (this.Sprites.length > 0)
			sprite = this.Sprites[Crafty.math.randomInt(0, this.Sprites.length - 1)];

		var entity = Crafty.e("2D, DOM, SpriteAnimation, Body, " + sprite)
			.attr({z:2, TileWidth:this.Width, TileHeight:this.Height});
		this.set({'entity' : entity });
	}