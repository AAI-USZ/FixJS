function(win, options) {
			var windows = this._windows,
				windowIdx = windows.indexOf(win);

			console.debug(windowIdx);

			// make sure the window exists and it's not the root
			if (windowIdx > 0) {
				windows.splice(windowIdx, 1);
				win.fireEvent("blur");
				this._contentContainer.remove(win);
				win.fireEvent("close");
				win._opened = 0;

				// hide the back button if we're back at the root
				windows.length <= 1 && this._backButton.animate({ opacity: 0, duration: 250 }, function() {
					this.opacity = 0;
					this.enabled = false;
				});

				win = windows[windows.length - 1];
				this._title.text = win._getTitle();
				win.fireEvent("focus");
			}
		}