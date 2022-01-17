function onThumbnailClick(event)
{
	//getAllChildren();
	$("#deleteBtn").css("left", -10000);
	$("#contextbar").css("visibility", "hidden");
	$("#play").css("visibility", "hidden");
	if("#"+event.currentTarget.id != currentSelected)
	{
		removePrevSelection();
	}
	if(!slideselected)
	{
		$("#"+event.currentTarget.id).addClass("thumbnailselected")
		currentSelected = "#"+event.currentTarget.id;
		slideselected = true;
		getCurrentSelectedSlide(currentSelected)
		hideInactiveSlides();
	}
	else
	{
		$("#"+event.currentTarget.id).removeClass("thumbnailselected")
		slideselected = false;
	}
	editedobject = "";
}