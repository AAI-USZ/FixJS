function()
{
	var w = this.canvas.width;
	var h = this.canvas.height;
	var l = this.stage.getNumChildren();
	
	// iterate through all the children and move them according to their velocity:
	for (var i=0; i<l; i++) {
		var ingredient = this.stage.getChildAt(i);
		if( ingredient != undefined && !ingredient.catched )
		{ 
			ingredient.y= (ingredient.y+ingredient.vy);
			if(ingredient.y>h) {
				this.destroyIngredient(ingredient);
			}
		}
	}
	
	var totalHeight=0;
	for(var i=0; i<this.catchedIngredients.length; i++) {
		var ingredient = this.catchedIngredients[i];
		totalHeight += ingredient.height;
		ingredient.y = h-totalHeight;
		ingredient.y = h-ingredient.height*(i+1);
		if(lfHeld) {
			ingredient.x = ingredient.x-MOVE_PLAYER_SPEED;
		}
		if(rtHeld) {
			ingredient.x = ingredient.x+MOVE_PLAYER_SPEED;
		}
	}
	
	this.player.y = h-this.player.height;
	
	// draw the updates to stage:
	this.stage.update();
}