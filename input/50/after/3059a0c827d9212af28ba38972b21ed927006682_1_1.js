function(inputOrSelector, message) {
	var input = ErrorUtils.getInput(inputOrSelector)	
	var insertedRow = input.closest('div.controls').append(ErrorUtils.getErrorRow(message));
	ErrorUtils.addErrorStyles(insertedRow);
}