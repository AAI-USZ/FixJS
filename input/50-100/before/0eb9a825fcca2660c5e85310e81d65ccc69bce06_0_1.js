function()
	{
		var type = this.ingredients[Math.random()*this.ingredients.length|0];
		var width = utils.getIngredientWidth();
		var height = utils.getIngredientHeight(type);
		var ingredient = new Ingredient(type, width, height);
		ingredient.x = BOUND_LEFT + Math.random() * BOUND_RIGHT;
		ingredient.y =  - 100;
		return ingredient;
	}