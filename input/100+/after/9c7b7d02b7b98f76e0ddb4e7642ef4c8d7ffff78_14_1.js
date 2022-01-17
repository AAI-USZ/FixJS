function resize() {
				var deltaSize, d = ed.getDoc(), body = d.body, de = d.documentElement, DOM = tinymce.DOM, resizeHeight = t.autoresize_min_height, myHeight;

				// Get height differently depending on the browser used
				myHeight = tinymce.isIE ? body.scrollHeight : (tinymce.isWebKit && body.clientHeight == 0 ? 0 : body.offsetHeight);

				// Don't make it smaller than the minimum height
				if (myHeight > t.autoresize_min_height)
					resizeHeight = myHeight;

				// If a maximum height has been defined don't exceed this height
				if (t.autoresize_max_height && myHeight > t.autoresize_max_height) {
					resizeHeight = t.autoresize_max_height;
					body.style.overflowY = "auto";
					de.style.overflowY = "auto"; // Old IE
				} else {
					body.style.overflowY = "hidden";
					de.style.overflowY = "hidden"; // Old IE
					body.scrollTop = 0;
				}

				// Resize content element
				if (resizeHeight !== oldSize) {
					deltaSize = resizeHeight - oldSize;
					DOM.setStyle(DOM.get(ed.id + '_ifr'), 'height', resizeHeight + 'px');
					oldSize = resizeHeight;

					// WebKit doesn't decrease the size of the body element until the iframe gets resized
					// So we need to continue to resize the iframe down until the size gets fixed
					if (tinymce.isWebKit && deltaSize < 0)
						resize();
				}
			}