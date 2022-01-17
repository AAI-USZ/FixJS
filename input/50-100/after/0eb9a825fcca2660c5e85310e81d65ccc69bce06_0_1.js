function()
	{
		var type = this.ingredients[Math.random()*this.ingredients.length|0];
		var width = utils.getIngredientWidth();
		var height = utils.getIngredientHeight(type);
		var ingredient = new Ingredient(type, width, height);
		ingredient.x = utils.lerp( BOUND_LEFT, BOUND_RIGHT, Math.random() );
		ingredient.y =  - 100;
		return ingredient;
	}