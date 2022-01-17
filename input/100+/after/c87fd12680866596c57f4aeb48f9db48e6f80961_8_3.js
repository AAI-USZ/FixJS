function fillLeftDown(x, y, rows, cols) {

			var tr, x2, r, c, cell;



			tr = grid[y][x].elm.parentNode;

			for (r = 1; r <= rows; r++) {

				tr = dom.getNext(tr, 'tr');



				if (tr) {

					// Loop left to find real cell

					for (x2 = x; x2 >= 0; x2--) {

						cell = grid[y + r][x2].elm;



						if (cell.parentNode == tr) {

							// Append clones after

							for (c = 1; c <= cols; c++)

								dom.insertAfter(cloneCell(cell), cell);



							break;

						}

					}



					if (x2 == -1) {

						// Insert nodes before first cell

						for (c = 1; c <= cols; c++)

							tr.insertBefore(cloneCell(tr.cells[0]), tr.cells[0]);

					}

				}

			}

		}