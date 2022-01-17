function setWidth() {
		var table = $(this).closest('table'),
			width = parseInt($(this).slider('value'), 10);
			
		blockSize = width;
		table.attr({width: width * 8 + 70}).css({width: width * 8 + 70});
		table.find('td.pgn-game-square').attr({width: width, height: width}).css({width: width, maxWidth: width, height: width});
		currentGame.drawBoard();
	}