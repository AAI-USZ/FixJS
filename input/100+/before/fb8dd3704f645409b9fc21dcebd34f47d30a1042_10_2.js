function(win, options) {
			var windows = this._windows,
				topWindowIdx = windows.length - 1,
				win = win || windows[topWindowIdx],
				windowLocation = windows.indexOf(win),
				backButton = this._backButton,
				nextWindow = this.window;

			if (~windowLocation) {
				// If the window is on top, we have to go to the previous window
				if (windows[topWindowIdx] === win) {
					if (topWindowIdx > 0) {
						nextWindow = windows[topWindowIdx - 1];
					} else {
						backButton.animate({opacity: 0, duration: 250}, function() {
							backButton.opacity = 0;
							backButton.enabled = false;
						});
					}
					this._title.text = nextWindow._getTitle();
				}

				// Remove the window
				windows.splice(windowLocation, 1);
				this._contentContainer.remove(win);

				win.fireEvent("blur");
				win.fireEvent("close");
				win._opened = 0;
				(topWindowIdx ? windows[topWindowIdx] : this.window).fireEvent("focus");
			}
		}