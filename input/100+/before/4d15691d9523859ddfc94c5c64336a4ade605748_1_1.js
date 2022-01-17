function() {
			// We use setTimeout because of iOS 4.2 issues
			setTimeout(function() {
				embedPlayer.triggerHelper('updateLayout');
			},0);
		}