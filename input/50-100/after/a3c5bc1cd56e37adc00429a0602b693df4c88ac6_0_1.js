function(index, li) {
		var link = $(li).children("a");
		if (link.length) {
			var idSelector = link.attr("href");
			tabIds2Tab[idSelector] = $(li);
			if (!firstTab) firstTab = idSelector;
			link.click(function() {
				showTab(idSelector);
				return false;
			});
		}
	}