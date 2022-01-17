function courseOnFocus(field) {
	// Clear the value and change the text-color back to black
	if($(field).val() == COURSE_PLACEHOLDER) {
		$(field).val("");
	}
	$(field).css("color", "black");
}