function startLearningNow() {
	//new route
	var routeName = $('#newRouteName').val(); //get route name
	
	//TO DO: check if route name is free, if not, then prompt! PS. this could happen in validObjName
	
	newRoute = new route(routeName); //create a new route object
	newRoute.alertOps.displayInDiv(true);
	newRoute.alertOps.divId("#loaderDialog-alertsConsole");
	newRoute.learn(); //start updating the object
	
	//prepare loading dialog
	$("#loaderDialog-header").html("<h1>Learning...</h1>");
	$("#loaderDialog-top").html(
		"<a href=\"javascript:newRoute.endLearn()\" data-role=\"button\" " +
		"data-theme=\"b\" data-transition=\"none\">Destination reached</a>")

	$.mobile.changePage('#loaderDialog', 'none', true, true);
}