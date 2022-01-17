function update() {
	writeSelectableDays(daysInMonth(document.getElementById("month").value - 1, document.getElementById("year").value));
	var date = new Date(document.getElementById("year").value, document.getElementById("month").value - 1, document.getElementById("day").value);
	var onejan = new Date(date.getFullYear(),0,1);
	var week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1)/7);
	if (week > 52)
		week = 1;
	document.getElementById("week").value = week;
}