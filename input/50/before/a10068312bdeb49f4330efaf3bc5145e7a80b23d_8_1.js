function() {

	var elements = [
		"src/levels/level.js",
        "src/entities/wall.js",
		"src/entities/fruit.js",
		"src/entities/body.js",
		"src/entities/snake.js",
		"src/entities/world.js",
		"src/levels/maps.js",
		"src/interfaces/scorebox.js",
		"src/interfaces/infobox.js",
	];
	
	//when everything is loaded, run the main scene
	require(elements, function() {	   

		
		theWorld = new World();
		
		
	});

}