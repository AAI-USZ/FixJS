function (e) {
			if (e.metaKey && e.which === 73) {
				if (this.findLangMarkup()) {
					FloatingMenu.activateTabOfButton('wailangfield');
					langField.focus();
				} else {
					this.addMarkupToSelection();
				}

				// Prevent from further handling.
				// on a MAC Safari, cursor would jump to location bar.
				// We have to use ESC and then META+I instead.
				return false;
			}
		}