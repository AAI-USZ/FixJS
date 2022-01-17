function escapeTable(upBool, currentRow, siblingDirection, table, event) {
							var tableSibling = table[siblingDirection];
							if (tableSibling) {
								moveCursorToStartOfElement(tableSibling);
								return true;
							} else {
								var parentCell = ed.dom.getParent(table, 'td,th');
								if (parentCell) {
									return handle(upBool, parentCell, event);
								} else {
									var backUpSibling = getChildForDirection(currentRow, !upBool);
									moveCursorToStartOfElement(backUpSibling);
									return tinymce.dom.Event.cancel(event);
								}
							}
						}