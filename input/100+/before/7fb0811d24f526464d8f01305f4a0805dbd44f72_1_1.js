function (json) {
		var feeds = json.feeds,
			feed,
			feed_id,
			old_unreadcount = that.items.unreadcount;

		postdata = "";
		// zero the unread count
		updateUnreadCount(0, true);

		console.log('processing feeds');
		if (feeds !== undefined && Object.keys(feeds).length > 0) {
			for (feed_id in feeds) {
				if (feeds.hasOwnProperty(feed_id)) {
					feed = feeds[feed_id];
					if (feed.ps !== 0 || feed.nt !== 0) {
						unreadfeeds[feed_id] = feed.feed_title;
						updateUnreadCount(feed.ps + feed.nt);
						postdata += 'feeds=' + feed_id + '&';
					}
					if (!mark_read_queue.hasOwnProperty(feed_id)) {
						mark_read_queue[feed_id] = [];
					}
				}
			}

			// only load more pages if we're already on page 1
			// this assumes that new items always come in at the top of the list
			page_count = Math.ceil((that.items.unreadcount - old_unreadcount) / 18);
			if (postdata.length > 0 && current_page <= 1 && page_count > 0) {
				//console.log(postdata);
				current_page = page_count;
				getPage(current_page);
			} else {
				invokeCallback();
			}
		} else {
			invokeCallback();
		}
	}