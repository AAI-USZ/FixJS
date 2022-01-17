function(inputOrSelector) {
	var input = inputOrSelector;
	if (typeof(inputOrSelector) == "string") {
		input = $(inputOrSelector);
	}
	input.closest('div.control-group').addClass('error');
}