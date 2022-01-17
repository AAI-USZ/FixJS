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
		tds.boardTd.append(this.boardDiv = $('<div>', {'class': 'pgn-board-div'}));
		tds.pgnTd.append(this.pgnDiv = $('<div>', {'class': 'pgn-pgn-display'}));
		tds.descriptionsTd.append(this.descriptionsDiv = $('<div>', {'class': 'pgn-descriptions'}));
	}