function (board) {
	var curfew = config.CURFEW_HOURS;
	if (!curfew || (config.CURFEW_BOARDS || []).indexOf(board) < 0)
		return null;
	var now = new Date();
	var tomorrow = day_after(now);
	var makeToday = hour_date_maker(now);
	var makeTomorrow = hour_date_maker(tomorrow);
	/* Dumb brute-force algorithm */
	var candidates = [];
	config.CURFEW_HOURS.forEach(function (hour) {
		candidates.push(makeToday(hour), makeTomorrow(hour));
	});
	candidates.sort();
	for (var i = 0; i < candidates.length; i++)
		if (candidates[i] > now)
			return candidates[i];
	return null;
}