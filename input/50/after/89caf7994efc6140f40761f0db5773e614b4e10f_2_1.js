function()
{

	dd.levelLoad();

	dd.drawTilemaps();

	// Update the player's position in the grid
	en.player.move(0, 0);
	
	dd.processTick();
}