function(dx,dy) {
				if (selectedElement != null || multiselected) {
					if(curConfig.gridSnapping) {
						// Use grid snap value regardless of zoom level
						var multi = svgCanvas.getZoom() * curConfig.snappingStep;
						dx *= multi;
						dy *= multi;
					}
					$('input').blur()
					svgCanvas.moveSelectedElements(dx,dy);
				}
			}