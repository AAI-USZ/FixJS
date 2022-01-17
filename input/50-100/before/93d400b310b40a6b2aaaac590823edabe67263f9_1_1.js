function init()
{
	//localStorage.clear();	

	$(document).bind("mouseup", onDocMouseUp);
	$("#mask").css("visibility", "visible")
	setupUI();
	setupKnobs();
	setupColorPicker();
	addSlide();
	togglePaginator(false);
	//checkForSavedPresentations();
	setupClipboard();
	//$('.scroll-pane').jScrollPane();

}