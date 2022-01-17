function(url) {
				// Include any GET parameters from the current URL, as the view state might depend on it.
				// For example, a list prefiltered through external search criteria might be passed to GridField.
				url = $.path.addSearchParams(url, window.location.search.replace(/^\?/, ''));
				$('.cms-container').loadPanel(url);
			}