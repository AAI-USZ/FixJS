function hideResizeRect() {
			dom.removeClass(selectedElm, 'mceResizeSelected');

			for (var name in resizeHandles) {
				dom.hide('mceResizeHandle' + name);
			}
		}