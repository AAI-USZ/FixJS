function(str, noAnim) {
		if (!str || !noAnim) {
			this.boards.push(this.board.slice());
			this.moves.push(moveBucket);
			moveBucket = [];
		}
		if (str) {
			var index = this.moves.length-1,
				link = $('<span>', {'class': (noAnim ? 'pgn-steplink' : 'pgn-movelink')})
				.text(str)
				.data({game: this, index: index, noAnim: noAnim})
				.click(linkMoveClick);
			this.pgnDiv.append(link);
			if (!noAnim) 
				this.linkOfIndex[index] = link;
		}
	}