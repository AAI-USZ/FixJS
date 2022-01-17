function columnIndex(column) {
							var colIndex = 0;
							var c = column;
							while (c.previousSibling) {
								c = c.previousSibling;
								colIndex = colIndex + getSpanVal(c, "colspan");
							}
							return colIndex;
						}