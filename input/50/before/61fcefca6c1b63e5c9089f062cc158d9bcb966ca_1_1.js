function OnEnterGameOverState()
{
	Ticker.removeListener(window);
	if(orderSummary.isOrderComplete()) {
		
	}
	else{
		showOrderFailUI();
	}
}