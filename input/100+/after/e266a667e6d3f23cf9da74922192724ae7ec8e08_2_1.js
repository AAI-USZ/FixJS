function() {
			if (typeOf(board) !== "element") {
				return;
			}

			var availableBoardWidth = board.getWidth();
			var newColumnCount = 1;
			var newColumnWidth = columnMaxWidth;

			if (newColumnWidth > availableBoardWidth) {
				newColumnWidth = availableBoardWidth;
			} else {
				newColumnCount += Math.floor((availableBoardWidth - newColumnWidth) / (newColumnWidth + columnMarginLeft));
			}

			if (newColumnWidth !== columnWidth) {
				resizeColumns(newColumnWidth, columnMarginLeft);
				columnWidth = newColumnWidth;
			}

			if (newColumnCount === columnCount) {
				return;
			}

			columnCount = newColumnCount;
			columns = [];

			// Remove all child elements and reset column index
			board.empty();
			columnIndex = 0;

			// Create columns
			for (var i = 0; i < columnCount; i++) {
				var column = createColumn();
				columns.push(column);
				board.grab(column);
			}

			// alert(JSON.stringify({
			// 	availableBoardWidth: availableBoardWidth,
			// 	columnCount: columnCount,
			// 	newColumnWidth: newColumnWidth
			// }));
			console.log("app.views.board.rebuild: Rebuilding board with %d images.", boardItems.length);

			// Fill columns with previously fetched images, if any.
			for (var i = 0, boardItemCount = boardItems.length; i < boardItemCount; i++) {
				placeImageOnBoard(boardItems[i]);
			}

			return board;
		}