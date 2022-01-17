function selectGame() {
		var game = allGames[this.value];
		if (game) 
			game.show();
	}