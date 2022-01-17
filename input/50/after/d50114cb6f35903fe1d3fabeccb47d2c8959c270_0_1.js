function parseTime(string) {
	var time = string.split(':');
	
	if (time.length == 1) {
		time[1] = 0;
	}
	
	return time;
}