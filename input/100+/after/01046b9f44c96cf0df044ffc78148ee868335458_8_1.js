function(td, x) {

						var x2, y2, rowspan, colspan;



						// Skip over existing cells produced by rowspan

						if (grid[y]) {

							while (grid[y][x])

								x++;

						}



						// Get col/rowspan from cell

						rowspan = getSpanVal(td, 'rowspan');

						colspan = getSpanVal(td, 'colspan');



						// Fill out rowspan/colspan right and down

						for (y2 = y; y2 < y + rowspan; y2++) {

							if (!grid[y2])

								grid[y2] = [];



							for (x2 = x; x2 < x + colspan; x2++) {

								grid[y2][x2] = {

									part : part,

									real : y2 == y && x2 == x,

									elm : td,

									rowspan : rowspan,

									colspan : colspan

								};

							}

						}

					}