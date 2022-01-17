function OnExitInGameState()
{
	document.onkeydown = null;
	document.onkeyup = null;
	
	controller.stopGame();
	Ticker.removeAllListeners();
	hideOrderSummaryUI();
	//Ticker.removeListener(window)
}