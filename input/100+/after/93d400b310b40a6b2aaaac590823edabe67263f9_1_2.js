function doObjectSelection(event)
{
	console.log("fontStyle "+fontStyle);
	//event.preventDefault();
	toggleToolbarControls(true);
	$("#play").css("visibility", "visible");
	$("#deleteBtn").css("opacity", 0)
	$("#contextbar").css("visibility", "visible");

	var prevFont;
	if("#"+event.target.id != editedobject)
	{
			//$(editedobject).text($("#editorBox").val());
		    $(editedobject).removeClass("itemselected");
		    prevFont = $(editedobject).css("font-family");
			//itemSelected = false;
			currentAddObject =""
			//hideEditorBox();
	}
	editedobject = "#"+event.target.id;
	var x = parseInt($(editedobject).css("left").split("px")[0]);
	var y = parseInt($(editedobject).css("top").split("px")[0]);
	var w = $(editedobject).width()
	var h = parseInt($(editedobject).css("height").split("px")[0]);
	$("#play").css("left",x + 300)
	$("#play").css("top", y + 220);
	$("#play").css("width", w)
	$("#play").css("height", h)
	var wt = $(editedobject).css("-webkit-transform");
	$("#play").css("-webkit-transform",wt);
	console.log("prev font "+currentSelectedFont);
	$(editedobject).css("z-index", 20)
	$(editedobject).css("font-family", currentSelectedFont);
	console.log(x+"     --   "+y)
	var h = parseInt($(editedobject).css("height").split("px")[0])
	$("#contextbar").css("left", x+145)
	$("#contextbar").css("top", (y+h)+90);
	if($(editedobject).attr("data-pic") == "true")
	{
		console.log("picture boss")
		$("#mask").css("visibility", "visible")
	}
	else
	{
		$("#mask").css("visibility", "hidden")

	}

	if(!itemSelected)
	{
			$(editedobject).addClass("itemselected");
			itemSelected = true;
			$("#deleteBtn").css("left", $(editedobject).css("left"));
			$("#deleteBtn").css("top", $(editedobject).css("top"));
	}
	if($(editedobject).attr("data-pic") != "true")
	{
		setFontStyle($(editedobject).attr("data-font-size"));
		setFont($(editedobject).attr("data-font-face"));
		$("#colorSelector").css('backgroundColor', $(editedobject).attr("data-selected-color"));
	}
	else
	{
		setFontStyle("");
		setFont("");
	}
	//setupColorPicker((editedobject).attr("data-selected-color"))
	resetSkewValues();
}