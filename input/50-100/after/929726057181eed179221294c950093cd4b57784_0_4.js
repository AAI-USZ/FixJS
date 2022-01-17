function() {
		clearTimer();
		if (currentGame)
			currentGame.toggle(false);
		currentGame = this;
		this.toggle(true);
		this.drawBoard();
	}