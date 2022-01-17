function(row, y) {

				each(row, function(cell, x) {

					var colSpan, rowSpan, newCell, i;



					if (isCellSelected(cell)) {

						cell = cell.elm;

						colSpan = getSpanVal(cell, 'colspan');

						rowSpan = getSpanVal(cell, 'rowspan');



						if (colSpan > 1 || rowSpan > 1) {

							setSpanVal(cell, 'rowSpan', 1);

							setSpanVal(cell, 'colSpan', 1);



							// Insert cells right

							for (i = 0; i < colSpan - 1; i++)

								dom.insertAfter(cloneCell(cell), cell);



							fillLeftDown(x, y, rowSpan - 1, colSpan);

						}

					}

				});

			}