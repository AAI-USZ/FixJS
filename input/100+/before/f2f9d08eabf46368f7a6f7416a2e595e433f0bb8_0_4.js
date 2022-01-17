function(str, noAnim) {
		if (!str || !noAnim) {
			this.boards.push(this.board.slice());
			this.moves.push(moveBucket);
			moveBucket = [];
		}
		if (str) {
			var link = $('<span>', {'class': 'pgn-movelink'})
				.text(str)
				.data({game: this, index: this.moves.length-1, noAnim: noAnim})
				.click(linkMoveClick);
			this.pgnDiv.append(link);
		}
	}