function () {
						// IE8 throws an error if we call worker._iframeEl.contentWindow.onmessage() directly
						var win = worker._iframeEl.contentWindow, onmessage = win.onmessage;
						onmessage.call(win, {data:obj});
					}