function updateResizeRect() {
			var controlElm = dom.getParent(selection.getNode(), 'table,img');

			if (controlElm) {
				showResizeRect(controlElm);
			} else {
				hideResizeRect();
			}
		}