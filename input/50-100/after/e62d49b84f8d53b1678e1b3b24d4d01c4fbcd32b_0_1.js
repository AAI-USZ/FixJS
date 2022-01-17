function()
	{
		var height = utils.getIngredientHeight('bottom');
		var player = new Ingredient("bottom",100,height);
		player.x = canvas.width/2;
		player.y = canvas.height - 35;
		player.catched = true;
		return player;
	}