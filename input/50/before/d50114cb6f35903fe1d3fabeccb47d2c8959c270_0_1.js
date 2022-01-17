function parseTime(string) {
	var time = string.split(':');
	
	if (time.length) {
		time[1] = 0;
	}
	
	return time;
}