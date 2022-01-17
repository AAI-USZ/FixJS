function(cell, x) {
						if (isCellSelected(cell)) {
							if (!startPos) {
								startPos = {x: x, y: y};
							}

							endPos = {x: x, y: y};
						}
					}