function() {
	Datum = this; // Anm. 1
	DoDat=donnerstag(Datum);
	kwjahr=DoDat.getFullYear();
	DoKW1=donnerstag(new Date(kwjahr,0,4)); // Anm. 2
	kw=Math.floor(1.5+(DoDat.getTime()-DoKW1.getTime())/86400000/7);
	return kw;
}