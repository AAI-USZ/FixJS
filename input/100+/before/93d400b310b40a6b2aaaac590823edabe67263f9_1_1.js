function onSlideMouseUp(event)
{
	/*if(editorvisible && editedobject!="")
	{
		console.log("Commit bug fix")
		   if($("#editorBox").val()!="")
		   {
			$(editedobject).text($("#editorBox").val());
			hideEditorBox();
			resetEditedObject();
		   }
	}
	*/


	var target = (event.target.id).split("____slide");
	console.log("Mouse uping "+event.target.id);
	if(target.length > 1)
	{
		$("#contextbar").css("visibility", "hidden");
		$(editedobject).removeClass("itemselected");
		itemSelected = false;
		$("#deleteBtn").css("opacity", 0);
		toggleToolbarControls(false);
		if(editorvisible)
		{
			//$(editedobject).text($("#editorBox").val());
		}
		if(addObjectFlag == false)
			currentAddObject = "";
	}
	if(ismarkedforcut && editedobject!="")
	{
		$(editedobject).css("opacity", 1)
		ismarkedforcut = false;

	}
	if(ismarkedforcut)
	{
		cutobject.css("opacity", 1);
		ismarkedforcut = false;
	}
	addObjectFlag = false;
}