function()
{

	dd.levelLoad();

	dd.drawTilemaps();

	// Update the player's position in the grid
	dd.player.move(0, 0);
	
	dd.processTick();
}