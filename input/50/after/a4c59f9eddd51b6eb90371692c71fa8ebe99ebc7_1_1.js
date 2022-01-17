function() {
				if (selectedElement != null || multiselected) {
					if (window.event.type === "keydown") flash($('#edit_menu'));
					svgCanvas.cutSelectedElements();
				}
			}