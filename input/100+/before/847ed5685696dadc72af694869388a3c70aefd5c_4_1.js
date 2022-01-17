function() {
		// array with local components
		var elements = [
			"src/components/MouseHover.js?v="+version,
			"src/components/KeyMoveControls.js?v="+version,
			"src/components/Hero.js?v="+version,
			"src/components/GraphLayout.js?v="+version,
			"src/components/TileMap.js?v="+version,
			"src/components/Body.js?v="+version,
			"src/components/Navigation.js?v="+version,
			"src/components/Controls.js?v="+version,
			"src/entities/base/BaseEntity.js?v="+version,
			"src/entities/base/MapEntity.js?v="+version,
			"src/entities/MapObjects.js?v="+version,
			"src/entities/player.js?v="+version,
			"src/entities/World.js?v="+version
		];

		//when everything is loaded, run the main scene
		require(elements, function() {
			if (gameContainer.scene != undefined) {
				Crafty.scene(gameContainer.scene);
			}
		});
	}