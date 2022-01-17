function (e) {
			if (e.metaKey && e.which === 73) {
				// In IE8 the handleKeyDown will trigger outside of the context 
				// of the wai-lang plugin. In that case we just omitt handling
				// the event. Otherwise a javascript error will occure. 
				if (typeof this.findLangMarkup === 'function') {
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
		}