function OnEnterInGameState()
{	
	//register key functions
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	$('#inGameMenu-replay').click( function(e) {
		controller.restartGame();
	});

	
	showOrderSummaryUI();
	
	controller.setOnCatchIngredient( OnCatchIngredient )
	controller.startGame();

	Ticker.addListener(window);
	
	
	
}