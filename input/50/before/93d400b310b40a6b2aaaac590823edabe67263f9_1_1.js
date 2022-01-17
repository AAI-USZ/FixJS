function showOrchestrationView()
{
	$("#contextbar").css("visibility","hidden")
	$("#mask").css("visibility", "hidden")
	togglePaginator(true);
	hidePresentationView();
	findAndArrangeSlides();
}