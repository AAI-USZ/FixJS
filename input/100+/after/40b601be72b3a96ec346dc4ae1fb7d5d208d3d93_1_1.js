function Calendar(year, month)
{
	log("Creating calendar", year+"-"+month);
	
	//Functions
	this.getCal = returnCalendar;
	this.genCal = calGetCal;

	//working variables
	this.year = year;
	this.month = month;
	this.workMonth = month-1;
	
	this.workDate = new Date(Date.UTC(year,this.workMonth,1));
	
	this.startStamp = Date.UTC(year,this.workMonth,1);
	
	this.offSet = this.workDate.getTimezoneOffset();
	
	
	
//	this.startStamp = this.workDate.getTime();
	
//	this.startStampUTC = Date.UTC(year,this.workMonth,1);
	
//	this.CCDate = new CCDate(this.startStampUTC);
	
	//log("Start points", new Date(this.startStamp).toISOString() + " " + new Date(this.startStampUTC).toISOString() + " " + new Date(this.CCDate.timestamp).toISOString());
	
	//this.cacheKey = "cal_"+this.workDate.getFullYear() + "_" + this.workDate.getMonth();

	//Object to pass to template for output
	this.outVars = new Object();
	
}