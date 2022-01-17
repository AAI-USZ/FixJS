function(url, title, data) {
				if(!data) data = {};
				if(!title) title = "";

				// Check change tracking (can't use events as we need a way to cancel the current state change)
				var contentEls = this._findFragments(data.pjax ? data.pjax.split(',') : ['Content']);
				var trackedEls = contentEls.find(':data(changetracker)').add(contentEls.filter(':data(changetracker)'));
				
				if(trackedEls.length) {
					var abort = false;
					
					trackedEls.each(function() {
						if(!$(this).confirmUnsavedChanges()) abort = true;
					});
					
					if(abort) return;
				}

				// Save tab selections so we can restore them later
				this.saveTabState();
				
				if(window.History.enabled) {
					// Active menu item is set based on X-Controller ajax header,
					// which matches one class on the menu
					window.History.pushState(data, title, url);
				} else {
					window.location = $.path.makeUrlAbsolute(url, $('base').attr('href'));
				}
			}