function setFontStyle(value)
{
	var dropdownlabel = "";
	fontStyle = value;

	if(fontStyle == "jumbo")
	{
		dropdownlabel = "Very Large"
	}
	else if(fontStyle == "largeheader")
	{
		dropdownlabel = "Large"
	}
	else if(fontStyle == "mediumheader")
	{
		dropdownlabel = "Medium"
	}
	else if(fontStyle == "smallheader")
	{
		dropdownlabel = "Small"
	}

	if(editedobject != "")
        {
		adjustObjectPositions(
			$(editedobject)
				.attr("data-font-size", value)
				.attr("class","ui-draggable slideobject itemselected "+value)

		);
		$("#play").css("visibility", "hidden");
	}
	$("#fontstyledropdown").html(dropdownlabel+'<b class="caret">');
}