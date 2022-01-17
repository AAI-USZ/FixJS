function onMouseUp(event)
{
	var item = $("#"+event.target.id)
	adjustObjectPositions(item)
	positionDeleteButton();
	var x = parseInt($(editedobject).css("left").split("px")[0]);
	var y = parseInt($(editedobject).css("top").split("px")[0]);
	var w = $(editedobject).width()
	var h = parseInt($(editedobject).css("height").split("px")[0]);
	$("#play").css("left",x + 300)
	$("#play").css("top", y + 220);
	$("#play").css("width", w)
	$("#play").css("height", h)
	
}