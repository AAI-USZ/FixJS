function() {

//	generateWorld();
    
	//var mapWidth = gameContainer.conf.get("MAP_WIDTH");
	//var mapHeight = gameContainer.conf.get("MAP_HEIGHT");
	//var tileSize = gameContainer.conf.get("TILE_SIZE");
    
	//var tileMap = Crafty.e("2D, Canvas, TileMap")
	//					.attr({x: 0, y: 0, z: 0, w:tileSize * mapWidth, h:tileSize * mapHeight})
	//					.randomGenerate(mapWidth, mapHeight, tileSize);

	var world = new World();
	var playerSpawnPoint = world.GetSpawnPoint(0);
	var player = new Player().Appear(world, playerSpawnPoint.x, playerSpawnPoint.y);

	gameContainer.cheat = new Cheat(player);

	// 100 slimes on lose!!!
	/*
	for (var i = 0; i < 100; i++)
	{
		// var x = Crafty.math.randomInt(0, world.MapWidth - 1);
		// var y = Crafty.math.randomInt(0, world.MapHeight - 1);
		var spawnPoint = world.GetRandomSpawnPoint();
		var slime = new Slime().Appear(world, spawnPoint.x, spawnPoint.y);
	}*/

	// tht062312 - Always keep player on center of the screen
	// MUST FIX: this make viewport follow or center on player is too slow right now.
	//Crafty.viewport.centerOn(player, 1);
	//Crafty.viewport.follow(player, 0, 0);
	
	console.log("START MAIN SCENE: player = ", player);
}