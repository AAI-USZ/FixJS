function OnExitInGameState()
{
	document.onkeydown = null;
	document.onkeyup = null;
	
	controller.stopGame();
	Ticker.removeAllListeners();
	//Ticker.removeListener(window)
}