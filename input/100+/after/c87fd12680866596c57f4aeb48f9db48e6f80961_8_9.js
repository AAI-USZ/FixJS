function(row) {

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

			}