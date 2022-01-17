function fixTableCellSelection(ed) {
					if (!tinymce.isWebKit)
						return;

					var rng = ed.selection.getRng();
					var n = ed.selection.getNode();
					var currentCell = ed.dom.getParent(rng.startContainer, 'TD,TH');
				
					if (!tableCellSelected(ed, rng, n, currentCell))
						return;
						if (!currentCell) {
							currentCell=n;
						}
					
					// Get the very last node inside the table cell
					var end = currentCell.lastChild;
					while (end.lastChild)
						end = end.lastChild;
					
					// Select the entire table cell. Nothing outside of the table cell should be selected.
					rng.setEnd(end, end.nodeValue.length);
					ed.selection.setRng(rng);
				}