function(piece, type, file, row) {
		this.clearPieceAt(piece.file, piece.row);
		var newPiece = this.createPiece(type, piece.color, file, row);
		this.registerMove({what:'a', piece: piece, file: file, row: row})
	}