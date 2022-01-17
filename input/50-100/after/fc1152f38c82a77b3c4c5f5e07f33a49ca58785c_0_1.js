function deleteObject()
{
	if(editedobject!="")
	{
		var id = $(editedobject).attr("id");
		var index = id.split("____object")[1];
		removeItemFromObjectMap(index);
		$(editedobject).remove();
		$("#deleteBtn").css("left", -30000)
		$("#contextbar").css("visibility", "hidden");
		$("#play").css("visibility", "hidden");
	}
}