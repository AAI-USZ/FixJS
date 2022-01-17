function selectGame() {
		var selector = $(this),
			wrapper = selector.closest('div.pgn-source-wrapper'),
			currentGame = wrapper.data('currentGame');
		currentGame.hide();
		game.gotoBoard(0);
		wrapper.data('currentGame', game);
	}