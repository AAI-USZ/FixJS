function() {
		// array with local components
		var elements = [
			"src/entities/World.js?v="+version,
			"src/components/Rendering.js?v="+version,
			"src/components/MouseHover.js?v="+version,
			"src/components/KeyMoveControls.js?v="+version,
			"src/components/Hero.js?v="+version,
			"src/maps/Graph.js?v="+version,
			"src/maps/Shape.js?v="+version,
			"src/components/TileMap.js?v="+version,
			"src/components/Body.js?v="+version,
			"src/components/Pawn.js?v="+version,
			"src/components/Abilities.js?v="+version,
			"src/components/Projectile.js?v="+version,
			"src/components/BodyAnimations.js?v="+version,
			"src/components/Navigation.js?v="+version,
			"src/components/AI.js?v="+version,
			"src/components/Gameplay.js?v="+version,
			"src/components/Controls.js?v="+version,
			"src/entities/base/BaseEntity.js?v="+version,
			"src/entities/base/MapEntity.js?v="+version,
			"src/entities/base/Creature.js?v="+version,
			"src/entities/Factories.js?v="+version,
			"src/entities/Monsters.js?v="+version,
			"src/entities/Minions.js?v="+version,
			"src/entities/MapObjects.js?v="+version,
			"src/entities/player.js?v="+version,
			"src/entities/Region.js?v="+version,
			"src/entities/Terrains.js?v="+version,
			"src/cheat.js?v="+version
		];

		//when everything is loaded, run the main scene
		require(elements, function() {
			if (gameContainer.scene != undefined) {
				Crafty.scene(gameContainer.scene);
			}
		});
	}