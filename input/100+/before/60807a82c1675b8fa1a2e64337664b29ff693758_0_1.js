function(weekNumber){
	Date.prototype.yyyymmdd = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = this.getDate().toString();
		return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' +(dd[1]?dd:"0"+dd[0]); // padding
	};



	var semesterStart = new Date('2012-05-07T07:00:00.000Z');   //this is UTC time
	var firstWeekEnd = new Date(semesterStart.getTime() + (6 - semesterStart.getDay())*24*60*60*1000); //notice sunday is the first day of week here
	var startDate = new Date();
	var endDate = new Date();
	var oneWeek = 7*24*60*60*1000;
	if (weekNumber === 1){
		return {start:semesterStart.yyyymmdd(),end:firstWeekEnd.yyyymmdd()};
	}
	else{
		var weekStart = new Date( firstWeekEnd.getTime()+ (weekNumber-2)* oneWeek + 24*60*60*1000);
		var weekEnd  =  new Date( firstWeekEnd.getTime()+ (weekNumber-1)* oneWeek);
		return {start:weekStart.yyyymmdd(), end:weekEnd.yyyymmdd()};


	}
}