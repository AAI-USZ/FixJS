function scrolledToBottom() {
		if (!lastSearch || $('.searchResults').length != 1 || $('.endRow').length != 0) return;
		pageCount++;
		Ajax.call({"page": "Search", "params": {query: lastSearch, page: pageCount}, "decorator": appendSearch, "clear": false});
	}