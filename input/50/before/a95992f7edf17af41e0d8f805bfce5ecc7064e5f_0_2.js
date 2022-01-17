function(ed, e) {
					var keyCode = e.keyCode;

					if (keyCode == 8 || keyCode == 37 || keyCode == 39) {
						removeCaretContainer(getParentCaretContainer(selection.getStart()));
					}
				}