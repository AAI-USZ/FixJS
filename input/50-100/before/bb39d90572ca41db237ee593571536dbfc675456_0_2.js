function endLearning() {
	newRoute.end();
	
	$("#loaderDialog-top").empty();
	$("#loaderDialog-alertsConsole").empty();
	$("#loaderDialog-bottom").empty();
	
	$.mobile.changePage('#startpage', 'none', true, true);
}