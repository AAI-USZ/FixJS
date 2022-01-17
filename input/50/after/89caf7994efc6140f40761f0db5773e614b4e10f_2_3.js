function()
{
	
	// Draw sprites on map
	en.player.draw();
	
	for (var key in dd.enemies)
	{
		dd.enemies[key].draw();
	}
}