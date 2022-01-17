function(date){
	var parts = date.match(/(\d+)/g);
	var dateobj = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);
	return dateobj;
}