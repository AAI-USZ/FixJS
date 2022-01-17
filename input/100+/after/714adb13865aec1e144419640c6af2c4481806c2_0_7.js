function() {

			if(dfpOptions.enableSingleRequest === true) {
				window.googletag.pubads().enableSingleRequest();
			}
			$.each(dfpOptions.setTargeting, function(k,v) {
				window.googletag.pubads().setTargeting(k,v);
			});
			if(dfpOptions.collapseEmptyDivs === true || dfpOptions.collapseEmptyDivs === 'original') {
				window.googletag.pubads().collapseEmptyDivs();
			}
			window.googletag.enableServices();

		}