function update() {
	writeSelectableDays(daysInMonth(document.getElementById("month").value - 1, document.getElementById("year").value));
	var date = new Date(document.getElementById("year").value, document.getElementById("month").value - 1, document.getElementById("day").value);
	Datum = date; // Anm. 1
	DoDat=donnerstag(Datum);
	kwjahr=DoDat.getFullYear();
	DoKW1=donnerstag(new Date(kwjahr,0,4)); // Anm. 2
	kw=Math.floor(1.5+(DoDat.getTime()-DoKW1.getTime())/86400000/7);
	document.getElementById("week").value = kw;
}