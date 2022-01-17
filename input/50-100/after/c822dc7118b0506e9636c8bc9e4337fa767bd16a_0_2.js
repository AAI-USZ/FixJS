function() {
		game.lives.text = "";
		for(var i = 0; i < game.player.lives; i++) {
			game.lives.text += icon.heart + " ";
		}
	}