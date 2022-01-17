function(color) {
		var king = this.piecesByTypeCol['k'][color][0];
		var rook = this.piecesByTypeCol['r'][color][0];
		king.move(fileOfStr('c'), king.row);
		rook.move(fileOfStr('d'), rook.row);
	}