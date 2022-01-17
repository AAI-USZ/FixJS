function(dir) {
				if (selectedElement != null) {
				  if (window.event.type === "keydown") flash($('#object_menu'));
					svgCanvas.moveUpDownSelected(dir);
				}
			}