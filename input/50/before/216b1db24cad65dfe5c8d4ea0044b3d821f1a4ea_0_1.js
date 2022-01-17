function courseOnFocus(field) {
	// Clear the value and change the text-color back to black
	if($(field).val() == "XXXX-XXX-XX") {
		$(field).val("");
	}
	$(field).css("color", "black");
}