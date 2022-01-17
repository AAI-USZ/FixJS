function goToToday(servlet){
	var date = new Date();
	window.location = servlet + "&selectedyear=" + date.getFullYear() + "&selectedmonth=" + (date.getMonth() + 1) + "&selectedweek=" + date.getWeek() + "&selectedday=" + date.getDate();
}