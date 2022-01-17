function() {
		Crafty.stop(true);
		Crafty("2D DOM").destroy();
		Crafty.init(ETA.config.stageWidth, ETA.config.stageHeight, ETA.config.frameRate);
		Crafty.sprite(16, "img/bgSprite.png", {
			bg: [0, 0,1000 ,550]
		});
		ETA.grid = Crafty.e("BGGrid").gridGameOver(this);
		gameState = STOPPED;
	}