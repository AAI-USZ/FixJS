function(date) {

	// append 0 to minutes if < 10
	var minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	date_string_a = [
		day_names[date.getDay()], ', ',
		month_names[date.getMonth()], ' ',
		date.getDate(), ', ', date.getFullYear(), ' ',
		date.getHours(), ':', minutes];
	// add am pm
	if (date.getHours() > 12) {
		date_string_a.push('pm');
	} else {
		date_string_a.push('am');
	}
	
	return date_string_a.join('');
}