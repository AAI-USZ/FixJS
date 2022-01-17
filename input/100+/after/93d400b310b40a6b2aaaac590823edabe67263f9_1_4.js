function onObjectDrag(event)
{
	var item = $("#"+event.target.id)
	var l = item.css("left").split("px")[0];
	var t = item.css("top").split("px")[0];
	if(l < 0)
	{
		item.css("left", 20)
	}
	if(t < 0)
	{
		item.css("top", 20)
	}
	$("#contextbar").css("visibility", "hidden");
	$("#play").css("visibility", "hidden");

	
}