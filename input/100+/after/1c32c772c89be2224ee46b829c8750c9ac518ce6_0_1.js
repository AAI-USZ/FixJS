function getColorTokenAtPos(hostEditor, pos) {
		var line = hostEditor._codeMirror.getLine(pos.line);
		var colors = line.split("#");
		
		var index = 0;
		for (var i in colors) {
			// skip the first match of the split operation (not a color)
			if (index > 0) {
				// match a color (3 or 6 hex characters)
				var matches = colors[i].match(/^[0-9a-f]{3,6}/i);
				if (matches.length > 0 && (matches[0].length === 3 || matches[0].length === 6)) {
					// return the token if the cursor is located inside the color
					if (pos.ch - 1 <= index + matches[0].length) {
						return { string: matches[0], start: index };
					}
				}
			}
			// advance the index and stop if we are beyond the cursor position
			// pos.ch - 1 is countered by index - 1
			// (a cursor positioned on the # should also match the color)
			index += colors[i].length + 1;
			if (index > pos.ch) {
				break;
			}
		}

		return null;
	}