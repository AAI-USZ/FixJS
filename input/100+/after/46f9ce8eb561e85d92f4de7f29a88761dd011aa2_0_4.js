function(){
	var tz = this.getTimezoneOffset();
	var D1 = new Date();
	var m = 0;
	while(m<12){
		D1.setMonth(++m);
		if(D1.getTimezoneOffset() > tz) return true;
		if(D1.getTimezoneOffset() < tz) return false;
	}
	return false;
}