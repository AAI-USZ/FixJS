function init() {
		// configure tab content
		$tab = $('<div class="table-container quiet-scrollbars">').attr('id', tabId);
		$events = $('<div class="events">').on('mousedown', 'div.event', onEventClicked).appendTo($tab);
		$tree = $('<div class="tree quiet-scrollbars">').appendTo($tab);
		Panel.addTab(tabId, "Traces", $tab);

		$(Debugger).on("paused", onPaused);
		$(Debugger).on("eventTrace", onEventTrace);
	}