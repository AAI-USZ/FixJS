function(date_string) {
	var year = date_string.substr(0,4);
	var month = date_string.substr(5,2) - 1;
	var day = date_string.substr(8,2);
	var hour = date_string.substr(11,2);	
	var min = date_string.substr(14,2);
	var sec = date_string.substr(17,2);
	return new Date(year,month,day,hour,min,sec);
}