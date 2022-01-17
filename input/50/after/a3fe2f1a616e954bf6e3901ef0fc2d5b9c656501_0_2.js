function(inputOrSelector) {
	var input = ErrorUtils.getInput(inputOrSelector)
	input.closest('div.control-group').removeClass('error');
}