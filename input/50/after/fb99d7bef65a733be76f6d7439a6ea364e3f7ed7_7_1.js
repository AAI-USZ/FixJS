function()
	{
		var entity = Crafty.e("2D, DOM, Body, SpawnPoint, grave")
			.attr({z:2, TileWidth:this.Width, TileHeight:this.Height});
		this.set({'entity' : entity });
	}