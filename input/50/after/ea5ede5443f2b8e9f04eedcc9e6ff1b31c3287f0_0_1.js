function (hour) {
		hour = (hour + 1) % 24;
		if (config.CURFEW_HOURS.indexOf(hour) < 0)
			candidates.push(makeToday(hour), makeTomorrow(hour));
	}