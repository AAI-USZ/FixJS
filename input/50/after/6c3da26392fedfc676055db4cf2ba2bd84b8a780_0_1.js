function OnExitInGameState()
{
	document.onkeydown = null;
	document.onkeyup = null;
	
	controller.stopGame();
	hideOrderSummaryUI();
	Ticker.removeListener(window)
}