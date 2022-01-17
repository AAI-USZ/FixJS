function(color) {
		var king = this.piecesByTypeCol['k'][color][0];
		var rook = this.piecesByTypeCol['r'][color][0];
		king.move(fileOfStr('b'), king.row);
		rook.move(fileOfStr('c'), rook.row);
	}