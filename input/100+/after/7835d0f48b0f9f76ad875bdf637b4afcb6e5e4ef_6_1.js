function(eventDateObj) {
		var dates = this.meta('timelineItemViews');
		var containsDate = false;
		for (var j = 0; j < dates.length; j++) {
			var date = dates[j];
			if (parseInt(date.meta('dateNumber'), 10) === eventDateObj.getDate()) {
				containsDate = true;
				return containsDate;
			}
		}
		return containsDate;
	}