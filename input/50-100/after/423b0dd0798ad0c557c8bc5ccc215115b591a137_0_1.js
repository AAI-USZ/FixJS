function updateResizeRect() {
			var controlElm = dom.getParent(selection.getNode(), 'table,img');

			// Remove data-mce-selected from all elements since they might have been copied using Ctrl+c/v
			tinymce.each(dom.select('img[data-mce-selected]'), function(img) {
				img.removeAttribute('data-mce-selected');
			});

			if (controlElm) {
				showResizeRect(controlElm);
			} else {
				hideResizeRect();
			}
		}