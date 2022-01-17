function(piece, type, file, row, capture) {
		piece[capture ? 'capture' : 'move'](file, row);
		this.clearPieceAt(file, row);
		var newPiece = this.createPiece(type, piece.color, file, row);
		this.registerMove({what:'a', piece: newPiece, file: file, row: row})
	}