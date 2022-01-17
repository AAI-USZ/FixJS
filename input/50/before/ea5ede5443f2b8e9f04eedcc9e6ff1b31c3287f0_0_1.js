function (hour) {
		hour++;
		if (config.CURFEW_HOURS.indexOf(hour) < 0)
			candidates.push(makeToday(hour), makeTomorrow(hour));
	}