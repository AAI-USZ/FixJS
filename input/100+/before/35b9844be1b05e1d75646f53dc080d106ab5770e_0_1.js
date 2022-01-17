function removeFeedIcon(id) {

	try {

		if (confirm(__("Remove stored feed icon?"))) {
			var query = "backend.php?op=pref-feeds&method=removeicon&feed_id=" + param_escape(id);

			console.log(query);

			notify_progress("Removing feed icon...", true);

			new Ajax.Request("backend.php", {
				parameters: query,
				onComplete: function(transport) {
					notify_info("Feed icon removed.");
					if (inPreferences()) {
						updateFeedList();
					} else {
						setTimeout('updateFeedList(false, false)', 50);
					}
				} });
		}

		return false;
	} catch (e) {
		exception_error("uploadFeedIcon", e);
	}
}