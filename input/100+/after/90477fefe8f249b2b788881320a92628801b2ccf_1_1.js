function() {
		Mojo.Log.info("Applying Filters");
		talksList.filtered.length = 0;

		var i, c;
		for (i = 0; i < talksList.full.length; i += 1) {
			c = talksList.full[i];

			if ((!filters.locations || c.inLocation(filters.locations)) && (!filters.favorites || favorite.is(c.id))) {
				talksList.filtered.push(c);
			}
		}

		updateWatchers.each(function(item) {
			item()
		});
	}