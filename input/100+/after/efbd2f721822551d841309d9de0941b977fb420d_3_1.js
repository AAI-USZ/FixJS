function() {

    var today = new Date();
	
	// Fix for cache
    if(gameContainer.env == 'dev') {
//		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
		version = "test";
		gameContainer.gameVersion = version;
	} else {
		version = gameContainer.gameVersion;
	}

	require([
		"src/sprites.js?v="+version+"",
		"src/config.js?v="+version+"",
	], function() {
		init();
                
		// declare all scenes
		var scenes = [
			"src/scenes/loading.js?v="+version,
			"src/scenes/main.js?v="+version
		];
		require(scenes, function(){
			console.log("DONE LOADING SCENES?");
			Crafty.scene("loading");
		});
	});
}