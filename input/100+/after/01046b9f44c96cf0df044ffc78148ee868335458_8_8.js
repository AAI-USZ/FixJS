function(row) {

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

			}