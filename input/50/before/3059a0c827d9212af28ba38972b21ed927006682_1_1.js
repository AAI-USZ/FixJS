function(inputOrSelector, message) {
	var input = ErrorUtils.getInput(inputOrSelector)	
	var insertedRow = input.parent().append(ErrorUtils.getErrorRow(message));
	ErrorUtils.addErrorStyles(insertedRow);
}