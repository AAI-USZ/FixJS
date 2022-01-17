function goToToday(servlet){
	var date = new Date();
	window.location = servlet + "&selectedyear=" + date.getFullYear() + "&selectedmonth=" + date.getMonth() + "&selectedweek=" + date.getWeek() + "&selectedday=" + date.getDate();
}