function onEventClicked(e) {
		currentEventTrace = $(e.currentTarget).data('trace');
		setupTree($tree);
	}