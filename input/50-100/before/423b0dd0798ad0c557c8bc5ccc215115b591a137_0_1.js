function updateResizeRect() {
			var controlElm = dom.getParent(selection.getNode(), 'table,img');

			if (controlElm) {
				showResizeRect(controlElm);
			} else if (selectedElm) {
				// Remove mceResizeSelected from all elements since they might have been copied using Ctrl+c/v
				dom.removeClass(dom.select('img.mceResizeSelected'), 'mceResizeSelected');
				hideResizeRect();
			}
		}