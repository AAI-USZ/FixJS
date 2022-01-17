function(cell) {

					var rowSpan = getSpanVal(cell, 'rowSpan');



					if (rowSpan > 1) {

						setSpanVal(cell, 'rowSpan', rowSpan - 1);

						pos = getPos(cell);

						fillLeftDown(pos.x, pos.y, 1, 1);

					}

				}