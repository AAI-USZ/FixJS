function(color, moveStr) {
		moveStr = moveStr.replace(/^\s+|[!?+# ]*(\$\d{1,3})?$/g, ''); // check, mate, comments, glyphs.
		if (!moveStr.length)
			return false;
		if (moveStr == 'O-O') 
			return this.kingSideCastle(color);
		if (moveStr == 'O-O-O') 
			return this.queenSideCastle(color);
		if ($.inArray(moveStr, ['1-0', '0-1', '1/2-1/2', '*']) + 1)
			return moveStr; // end of game - white wins, black wins, draw, game halted/abandoned/unknown.
		var match = moveStr.match(/([RNBKQ])?([a-h])?([1-8])?(x)?([a-h])([1-8])(=[RNBKQ])?/);
		if (!match) {
			return false;
		}
		
		var type = match[1] ? match[1].toLowerCase() : 'p';
		var oldFile = fileOfStr(match[2]);
		var oldRow = rowOfStr(match[3]);
		var isCapture = !!match[4];
		var file = fileOfStr(match[5]);
		var row = rowOfStr(match[6]);
		var promotion = match[7];
		var candidates = this.piecesByTypeCol[type][color];
		if (!candidates || !candidates.length)
			throw 'could not find matching pieces. type="' + type + ' color=' + color + ' moveAGN=' + moveStr;
		var found = false;
		for (var c in candidates) {
			found = candidates[c].matches(oldFile, oldRow, isCapture, file, row);
			if (found)
				break;
		}
		if (!found)
			throw 'could not find a piece that can execute this move. type="' + type + ' color=' + color + ' moveAGN=' + moveStr;
//		confirm('about to execute ' + moveStr + ' piece type is ' + found.type + ' at ' + found.file + found.row + ' file=' + file + ' row=' + row)
		if (promotion)
			this.promote(found, promotion.charAt(1), file, row);
		else if (isCapture)
			found.capture(file, row);
		else
			found.move(file, row);
		return moveStr;
	}