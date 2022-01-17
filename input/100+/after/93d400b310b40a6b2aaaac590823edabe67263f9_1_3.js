function triggerObjectAdd(event)
{

	if(editorvisible == true)
	{
		editorvisible = false;
		hideEditorBox();	
		resetEditedObject()
		return;
	}
	if("#"+event.target.id == addTarget)
	{
		if(itemSelected)
		{
			itemSelected = false;
			$(editedobject).removeClass("itemselected");
			
				$("#deleteBtn").css("opacity", 0);
				$("#deleteBtn").css("left", -30000);
				currentAddObject = "";
			
		}
	}
	var idcheck = (event.target.id).split("____picture");
	if(idcheck.length > 1)
	{
		bypasscondition = true;
	}
	else
	{
		bypasscondition = false;
	}
	if((currentAddObject == "text" && "#"+event.target.id == addTarget) || (currentAddObject == "text" && bypasscondition == true))
	{		
			$("#play").css("-webkit-transform","matrix(1,0,0,1,0,0)")
	    	if(colorboxopen)
	 		{
	 			colorboxopen = false;
	 			return;
	 		}
			if("#"+event.target.id == addTarget || bypasscondition == true)
			{
				objectcounter = Math.round(Math.random()*100000);
				var str = largetext.split("!ID!").join("____object"+objectcounter);
				str = str.split("!OBJECT_SIZE!").join(fontStyle);
				$(addTarget).append(str)	
				objectmap.push({index:objectcounter});
				console.log("Object id "+"#____object"+objectcounter)
				var obj = calculateOrchCoords(event.offsetX, event.offsetY);
				$("#____object"+objectcounter).css("left", event.offsetX);
				$("#____object"+objectcounter).css("top", event.offsetY);
				$("#____object"+objectcounter).css("font-family", currentSelectedFont);
				$("#____object"+objectcounter).bind("mousedown", doObjectSelection)
				$("#____object"+objectcounter).bind("mouseup", onMouseUp)
				$("#____object"+objectcounter).bind("drag", onObjectDrag)
				$("#____object"+objectcounter).draggable(
						{
						   //appendTo: addTarget
						   cursor:"pointer"
						}
					 );
				if(editedobject!="")
				{
					$(editedobject).removeClass("itemselected");
					itemSelected = false;
					$("#deleteBtn").css("opacity", 0)
					currentAddObject = "";


				}
				editedobject = ("#____object"+objectcounter);
				$(editedobject).css("font-family", selectedFont);
			objectcounter++;
			}
	}
	else
	{

		positionDeleteButton()
		colorboxopen = false;	

	}

}