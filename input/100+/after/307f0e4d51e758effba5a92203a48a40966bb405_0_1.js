function onKeyUp(event)
{
		if(event.keyCode == 13)
		{
			console.log("Enter key");
			$(editedobject).text($("#editorBox").val());
			
			$("#editorBox").val("");
			editorvisible = false
			resetEditedObject();
			positionDeleteButton()
			hideEditorBox();	
			$("#play").css("visibility", "hidden")

		}
		else if(event.keyCode == 27)
		{
			editorvisible = false;
			resetEditedObject();
			positionDeleteButton();
			hideEditorBox();	
			$("#play").css("visibility", "hidden")

			
		}
}