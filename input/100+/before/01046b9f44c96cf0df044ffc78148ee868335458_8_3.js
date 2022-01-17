function(row, y) {
				var cell, rowSpan, colSpan;

				if (!row[posX])
					return;

				cell = row[posX].elm;
				if (cell != lastCell) {
					colSpan = getSpanVal(cell, 'colspan');
					rowSpan = getSpanVal(cell, 'rowspan');

					if (colSpan == 1) {
						if (!before) {
							dom.insertAfter(cloneCell(cell), cell);
							fillLeftDown(posX, y, rowSpan - 1, colSpan);
						} else {
							cell.parentNode.insertBefore(cloneCell(cell), cell);
							fillLeftDown(posX, y, rowSpan - 1, colSpan);
						}
					} else
						setSpanVal(cell, 'colSpan', cell.colSpan + 1);

					lastCell = cell;
				}
			}