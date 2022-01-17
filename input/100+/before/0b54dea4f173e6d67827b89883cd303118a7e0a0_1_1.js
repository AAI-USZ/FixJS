function OrderSummary( ){
	
	this.ingredientCount = {
		onion : 0,
		lettuce : 0,
		tomato : 0,
	    egg:0,
	    meat:0,
	    cheese:0
	}
	
	this.tips=0;
	
	this.ingredientCountToGo={}
	
	//show ingredient by order	
	for(var i=0; i<level.order.ingredients.length; i++){
		this.ingredientCountToGo[level.order.ingredients[i].type] = 
			level.order.ingredients[i].num;
			
	}
	
	//set UI
	hideAllIngredients();
	initOrderSummaryUIByLevel(level);
	
	showOrderSummaryUI();
	
	this.subTotal = 0;
}