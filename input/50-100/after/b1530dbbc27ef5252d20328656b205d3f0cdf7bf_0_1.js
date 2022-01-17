function()
{
	orderSummary = new OrderSummary();
	this.stage.removeAllChildren();
	this.stage.clear();
	this.stage.addChildAt(sky,0);
	this.addPlayer();
	this.timerId = setInterval(this.addIngredient, 1200);
	this.curControlIngredientIndex = 0;
	this.stageOffsetY = 0;
	stage.update();
}