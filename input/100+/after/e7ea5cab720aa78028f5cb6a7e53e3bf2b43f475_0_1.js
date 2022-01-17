function(date) {

	// append 0 to minutes if < 10
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	var end_string = 'am';
	var hours = date.getHours();
	if (hours > 12) {
		hours = hours - 12;
		end_string = 'pm';
	}
	
	date_string_a = [
		day_names[date.getDay()], ', ',
		month_names[date.getMonth()], ' ',
		date.getDate(), ', ', date.getFullYear(), ' ',
		hours, ':', minutes, end_string];
	
	return date_string_a.join('');
}