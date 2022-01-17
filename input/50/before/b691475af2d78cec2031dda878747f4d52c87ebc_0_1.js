function(url) {
				// Include any GET parameters from the current URL, as the view state might depend on it.
				// For example, a list prefiltered through external search criteria might be passed to GridField.
				if(window.location.search) url += window.location.search;
				$('.cms-container').loadPanel(url);
			}