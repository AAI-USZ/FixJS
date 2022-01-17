function OnEnterGameOverState()
{
	if(orderSummary.isOrderComplete()) {
		
	}
	else{
		showOrderFailUI();
	}
}