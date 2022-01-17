function() {
	var onejan = new Date(this.getFullYear(),0,1);
	var week = Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
	if (week > 52)
		week = 1;
	return week;
}