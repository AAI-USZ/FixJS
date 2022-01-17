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
	
	this.workDate = new Date(year,this.workMonth,1);
	this.startStamp = this.workDate.getTime();
	
	this.cacheKey = "cal_"+this.workDate.getFullYear() + "_" + this.workDate.getMonth();

	//Object to pass to template for output
	this.outVars = new Object();
	
}