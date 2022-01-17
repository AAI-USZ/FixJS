function(started, finished) {
	if(!started || !finished) return 0; //todo better data/bugfix
	var s = moment(started).clone().minutes(0).seconds(0).milliseconds(0);
	var f = moment(finished).minutes(0).seconds(0).milliseconds(0);
	var hours = 0;
	while(s.unix() != f.unix()) {
		var lunch = s.hours() == 12;
		var morning = s.hours() < 9;
		var night = s.hours() > 17;
		var weekend = s.day() == 0 || s.day() == 6;
		if(!lunch && !morning && !night && !weekend) {
			hours++;
		}
		s.add('hours', 1);
	}
	return hours;
}