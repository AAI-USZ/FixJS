function onEventClicked(e) {
		event.preventDefault();
		currentEventTrace = $(e.currentTarget).data('trace');
		setupTree($tree);
	}