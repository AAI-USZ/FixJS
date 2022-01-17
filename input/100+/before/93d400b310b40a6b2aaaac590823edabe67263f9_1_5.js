function adjustObjectPositions(item)
{
	var l = parseInt(item.css("left").split("px")[0]);
	var t = parseInt(item.css("top").split("px")[0]);
	var h = parseInt(item.css("height").split("px")[0]);
	if(l < 0)
	{
		item.css("left", 20)
	}
	if(t < 0)
	{
		item.css("top", 20)
	}
	/*if(t > 400)
	{
		item.css("top", 400)
	}
	if(l > 600)
	{
		item.css("left", 600)
	}
	*/
	l = parseInt(item.css("left").split("px")[0]);
	t = parseInt(item.css("top").split("px")[0]);
	h = parseInt(item.css("height").split("px")[0]);
	$("#contextbar").css("visibility", "visible");
	$("#contextbar").css("left", l + 145);
	$("#contextbar").css("top", (t+h)+90);
}