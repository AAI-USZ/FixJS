function() {
				if (selectedElement != null) {
					svgCanvas.convertToPath();
					elems = svgCanvas.getSelectedElems()
					//svgCanvas.selectorManager.requestSelector(elems[0]).reset(elems[0])
					svgCanvas.selectorManager.requestSelector(elems[0]).selectorRect.setAttribute("display", "none");
					svgCanvas.setMode("pathedit")
					path.toEditMode(elems[0]);
					svgCanvas.clearSelection();
				}
			}