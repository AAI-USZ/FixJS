function resize() {
				var d = ed.getDoc(), b = d.body, de = d.documentElement, DOM = tinymce.DOM, resizeHeight = t.autoresize_min_height, myHeight;

				// Get height differently depending on the browser used
				myHeight = tinymce.isIE ? b.scrollHeight : de.offsetHeight;

				// Don't make it smaller than the minimum height
				if (myHeight > t.autoresize_min_height)
					resizeHeight = myHeight;

				// Resize content element
				DOM.setStyle(DOM.get(ed.id + '_ifr'), 'height', resizeHeight + 'px');

				// if we're throbbing, we'll re-throb to match the new size
				if (t.throbbing) {
					ed.setProgressState(false);
					ed.setProgressState(true);
				}
			}