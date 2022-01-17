function showOrchestrationView()
{
	$("#contextbar").css("visibility","hidden");
	$("#play").css("visibility", "hidden");
	//$("#mask").css("visibility", "hidden")
	togglePaginator(true);
	hidePresentationView();
	findAndArrangeSlides();
}