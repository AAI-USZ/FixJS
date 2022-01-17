function setFont(font)
{
	selectedFont = font;
	currentSelectedFont = font;
	$(editedobject).attr("data-font-face", currentSelectedFont)
	$("#fontdropdown").html(currentSelectedFont+'<b class="caret">');
	if(editedobject != "")
	{
		$(editedobject).css("font-family", selectedFont);
	}
}