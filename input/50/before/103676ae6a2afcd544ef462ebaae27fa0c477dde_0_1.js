function onEventClicked(e) {
		currentEventTrace = $(e.currentTarget).data('trace');
		onTraceSelected(currentEventTrace);
		setupTree($tree);
	}