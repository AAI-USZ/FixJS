function Game(tds) {
		$.extend(this, {
			board: [],
			boards: [],
			pieces: [],
			moves: [],
			linkOfIndex: [],
			index: 0,
			piecesByTypeCol: {},
			descriptions: {},
			tds: tds});
		this.boardDiv = $('<div>', {'class': 'pgn-board-div'});
		this.pgnDiv = $('<div>', {'class': 'pgn-pgn-display'});
		this.descriptionsDiv = $('<div>', {'class': 'pgn-descriptions'});
	}