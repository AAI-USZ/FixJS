function pasteRows(rows, before) {

			var selectedRows = getSelectedRows(),

				targetRow = selectedRows[before ? 0 : selectedRows.length - 1],

				targetCellCount = targetRow.cells.length;



			// Calc target cell count

			each(grid, function(row) {

				var match;



				targetCellCount = 0;

				each(row, function(cell, x) {

					if (cell.real)

						targetCellCount += cell.colspan;



					if (cell.elm.parentNode == targetRow)

						match = 1;

				});



				if (match)

					return false;

			});



			if (!before)

				rows.reverse();



			each(rows, function(row) {

				var cellCount = row.cells.length, cell;



				// Remove col/rowspans

				for (i = 0; i < cellCount; i++) {

					cell = row.cells[i];

					setSpanVal(cell, 'colSpan', 1);

					setSpanVal(cell, 'rowSpan', 1);

				}



				// Needs more cells

				for (i = cellCount; i < targetCellCount; i++)

					row.appendChild(cloneCell(row.cells[cellCount - 1]));



				// Needs less cells

				for (i = targetCellCount; i < cellCount; i++)

					dom.remove(row.cells[i]);



				// Add before/after

				if (before)

					targetRow.parentNode.insertBefore(row, targetRow);

				else

					dom.insertAfter(row, targetRow);

			});



			// Remove current selection

			dom.removeClass(dom.select('td.mceSelected,th.mceSelected'), 'mceSelected');

		}