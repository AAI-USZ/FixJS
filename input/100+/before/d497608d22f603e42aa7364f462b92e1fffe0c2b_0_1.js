function (json) {
		var allstories = json.stories,
			story,
			nogood,
			intel,
			i,
			prop,
			page_empty = true;

		console.log('processing stories');
		console.log('got ' + allstories.length + ' stories');
		if (allstories.length > 0) {
			for (i = 0; i < allstories.length; i += 1) {
				story = allstories[i];
				if (story.read_status === 0) {
					nogood = false;
					// story is no good if any intelligence attributes are -1
					// but a +1 overrides all
					intel = story.intelligence;
					for (prop in intel) {
						if (intel.hasOwnProperty(prop)) {
							if (parseInt(intel[prop], 10) === -1) {
								nogood = true;
							}
							if (parseInt(intel[prop], 10) === 1) {
								nogood = false;
								break;
							}
						}
					}
					if (nogood === false &&
							that.items.stories.containsObjectWithPropertyValue('id', story.id) === false) {
						story.site_title = unreadfeeds[story.story_feed_id];
						that.items.stories.push(story);
						page_empty = false;
					}
				}

				if (page_empty) {
					// page was empty, try next
					that.getNextPage(callback);
				} else {
					// sort items by date
					that.items.stories.sort(sortByDate);
				}
			}
		} else {
			that.getNextPage();
		}

		invokeCallback();

		if (allstories.length < 10) {
			that.getNextPage(callback);
		}
	}