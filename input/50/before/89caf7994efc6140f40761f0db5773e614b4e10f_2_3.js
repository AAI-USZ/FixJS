function()
{
	
	// Draw sprites on map
	dd.player.draw();
	
	for (var key in dd.enemies)
	{
		dd.enemies[key].draw();
	}
}