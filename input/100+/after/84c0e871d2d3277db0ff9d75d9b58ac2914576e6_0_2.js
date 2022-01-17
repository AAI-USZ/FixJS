function()
{
	var w = this.canvas.width;
	var canvasHeight = this.canvas.height;
	var l = this.stage.getNumChildren();
	
	// destory useless ingredients 
	for (var i=0; i<l; i++) {
		var ingredient = this.stage.getChildAt(i);
		if( ingredient != undefined && !ingredient.catched )
		{ 
			ingredient.y= (ingredient.y+ingredient.vy);
			if(ingredient.y>canvasHeight) {
				this.destroyIngredient(ingredient);
			}
		}
	}
	
	// move ingredients according to their velocity
	var gapToBottomBorder = 0 
	var totalHeight = gapToBottomBorder;
	for(var i=0; i<this.catchedIngredients.length; i++) 
	{
		var ingredient = this.catchedIngredients[i];
		totalHeight += ingredient.height;
		if ( i == this.catchedIngredients.length - MAX_INGREDIENTS_ON_STAGE - 1 )
		{
			this.stageOffsetY = totalHeight - gapToBottomBorder;
			this.curControlIngredientIndex = i;
		}
		ingredient.y = canvasHeight - totalHeight;
	}
	for(var i=0; i<this.catchedIngredients.length; i++) 
	{
		var ingredient = this.catchedIngredients[i];
		ingredient.y += this.stageOffsetY;
	}
	
	var curControlIngredient = this.catchedIngredients[this.curControlIngredientIndex]
	if(lfHeld) 
	{
		curControlIngredient.x = curControlIngredient.x - MOVE_PLAYER_SPEED;
	}
	if(rtHeld) 
	{
		curControlIngredient.x = curControlIngredient.x + MOVE_PLAYER_SPEED;
	}
	curControlIngredient.x = utils.clamp( curControlIngredient.x, BOUND_LEFT, BOUND_RIGHT );

	var lastIngredient = curControlIngredient;
	for(var i = this.curControlIngredientIndex + 1; i < this.catchedIngredients.length; i++)
	{
		var ingredient = this.catchedIngredients[i];
		ingredient.x = utils.lerp( ingredient.x, lastIngredient.x, 
				Ticker.getInterval() / 100 );
		lastIngredient = ingredient;
	}
	
	// draw the updates to stage:
	this.stage.update();
}