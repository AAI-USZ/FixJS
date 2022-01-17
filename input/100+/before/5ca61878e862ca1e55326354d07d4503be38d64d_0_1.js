function endResize() {
			var doc = editor.getDoc();

			if (width) {
				// Resize by using style or attribute
				if (selectedElm.style.width) {
					dom.setStyle(selectedElm, 'width', width);
				} else {
					dom.setAttrib(selectedElm, 'width', width);
				}
			}

			// Resize by using style or attribute
			if (height) {
				if (selectedElm.style.height) {
					dom.setStyle(selectedElm, 'height', height);
				} else {
					dom.setAttrib(selectedElm, 'height', height);
				}
			}

			dom.unbind(doc, 'mousemove', resizeElement);
			dom.unbind(doc, 'mouseup', endResize);

			if (rootDocument != doc) {
				dom.unbind(rootDocument, 'mousemove', resizeElement);
				dom.unbind(rootDocument, 'mouseup', endResize);
			}

			// Remove ghost and update resize handle positions
			dom.remove(selectedElmGhost);
			showResizeRect(selectedElm);
		}