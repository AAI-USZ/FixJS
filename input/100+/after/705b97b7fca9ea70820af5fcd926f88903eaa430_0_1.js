function catchupFeed(feed, is_cat) {
	try {
		if (is_cat == undefined) is_cat = false;

		var str = __("Mark all articles in %s as read?");
		var fn = getFeedName(feed, is_cat);

		str = str.replace("%s", fn);

		if (getInitParam("confirm_feed_catchup") == 1 && !confirm(str)) {
			return;
		}

		var max_id = 0;

		if (feed == getActiveFeedId() && is_cat == activeFeedIsCat()) {
			$$("#headlines-frame > div[id*=RROW]").each(
				function(child) {
					var id = parseInt(child.id.replace("RROW-", ""));

					if (id > max_id) max_id = id;
				}
			);
		}

		var catchup_query = "?op=rpc&method=catchupFeed&feed_id=" +
			feed + "&is_cat=" + is_cat + "&max_id=" + max_id;

		console.log(catchup_query);

		notify_progress("Loading, please wait...", true);

		new Ajax.Request("backend.php",	{
			parameters: catchup_query,
			onComplete: function(transport) {
					handle_rpc_json(transport);

					if (feed == getActiveFeedId() && is_cat == activeFeedIsCat()) {

						$$("#headlines-frame > div[id*=RROW][class*=Unread]").each(
							function(child) {
								child.removeClassName("Unread");
							}
						);
					}

					var show_next_feed = getInitParam("on_catchup_show_next_feed") == "1";

					if (show_next_feed) {
						var nuf = getNextUnreadFeed(feed, is_cat);

						if (nuf) {
							viewfeed(nuf, '', is_cat);
						}
					}

					notify("");
				} });

	} catch (e) {
		exception_error("catchupFeed", e);
	}
}