function addSlide()
{
	$("#contextbar").css("visibility", "hidden")
	var str = slidethumbtemplate.split("!SLIDE_ID!").join("slidethumb"+slidecounter);
	str = str.split("!SLIDENUMBER!").join("slide_number_sliderthumb"+slidecounter);
	str = str.split("!THUMBDISPLAYNUMBER!").join("slide_number_sliderthumb"+slidecounter);
	str = str.split("!COUNT!").join(slidecounter);
	str = str.split("!THUMBDELETE!").join("delete_btn_slidethumb"+slidecounter);
	$("#slidethumbnailholder").append(str);
	$("#slidethumb"+slidecounter).bind("click", onThumbnailClick)
	$("#slidethumb"+slidecounter).bind("mouseover", onThumbnailMouseOver)
	$("#slidethumb"+slidecounter).bind("mouseout", onThumbnailMouseOut)

	removePrevSelection();
	$("#slidethumb"+slidecounter).addClass("thumbnailselected");

	currentSelected = "#slidethumb"+slidecounter;
	getCurrentSelectedSlide(currentSelected);
	hideInactiveSlides();
	var str1 = slidetemplate.split("!SLIDE_ID!").join("____slide"+slidecounter);
	$("#drawingboard").append(str1);
	$("#____slide"+slidecounter).bind("click", triggerObjectAdd)
	$("#____slide"+slidecounter).bind("dblclick", toastEditor)
	$("#____slide"+slidecounter).bind("mouseup", onSlideMouseUp)
	slidemap.push({index:slidecounter});
	editedobject = "";
	slidecounter++;
	$("#deleteBtn").css("left", -20000);

}