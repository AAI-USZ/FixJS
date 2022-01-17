function setSuccessUI() {
	var summaryList = $('#successSammary');
	for( i=0; i < level.order.ingredients.length; i++) {
		var type = level.order.ingredients[i].type;
		var num = level.order.ingredients[i].num;
		summaryList.append('<li><span class="sammaryType">'+type+'</span> : <span class="sammaryNum">'+num+'</span></li>');
	}
	
	$('#successTotal').text( '$' + orderSummary.subTotal );
	
	var tips = Math.round(orderSummary.subTotal * orderSummary.tips) / 100;
	
	$('#successTips').text( '$' + tips );
}