function(cell) {
					if (dom.hasClass(cell, 'mceSelected') || cell == selectedCell.elm) {
						rows.push(row);
						return false;
					}
				}