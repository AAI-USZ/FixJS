function()
{
	var l = this.stage.getNumChildren();
	var checkedIngredient = this.catchedIngredients[this.catchedIngredients.length-1];
	for (var i=0; i<l; i++) {
		var ingredient = this.stage.getChildAt(i);
	
		if( checkedIngredient.y - checkedIngredient.height -(ingredient.y+ingredient.vy) < 5 && 
			!ingredient.catched && !ingredient.dropped ) 
		{
			var xDistance = ingredient.x - checkedIngredient.x;
			var xDistanceAbs = utils.abs( ingredient.x, checkedIngredient.x )
			if ( xDistanceAbs < 50 )
			{
				if(ingredient.type == 'top') {
					SM.SetStateByName( "gameover" );
				}
				ingredient.catched = true;
				ingredient.x = this.catchedIngredients[this.curControlIngredientIndex].x;
				ingredient.y = this.catchedIngredients[this.curControlIngredientIndex].y;
				this.catchedIngredients.push(ingredient);

				if ( this.onCatchIngredient != null )
				{
					this.onCatchIngredient( ingredient );
				}
			}
			else
			{
				ingredient.dropped = true;
				if ( xDistanceAbs < 100 )
				{
					var angle = xDistance > 0 ? 75 : -75;
					Tween.get( ingredient ).to( {rotation: angle}, 500, Ease.linear );
				}
			}
		}
	}
}