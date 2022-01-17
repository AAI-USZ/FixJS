function() {
			if (typeOf(board) !== "element") {
				return;
			}

			var availableBoardWidth = board.getWidth();
			var newColumnCount = 0;

			if (columnWidth <= availableBoardWidth) {
				newColumnCount++;
				availableBoardWidth -= columnWidth;

				newColumnCount += Math.floor(availableBoardWidth / (columnWidth + columnLeftMargin));
			}

			if (newColumnCount === columnCount) {
				return;
			}

			columnCount = newColumnCount;
			columns = [];

			// Remove all children elements
			board.empty();

			for (i = 0; i < columnCount; i++) {
				var column = createColumn({
					// styles: {
					// 	"margin-left": i === 0 ? 0 : columnLeftMargin
					// }
				});
				columns.push(column);
				board.grab(column);
			}

			return board;
		}