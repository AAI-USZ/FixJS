function()
	{
		var player = new Ingredient('bottom');
		player.x = canvas.width/2;
		player.y = canvas.height;
		player.catched = true;
		return player;
	}