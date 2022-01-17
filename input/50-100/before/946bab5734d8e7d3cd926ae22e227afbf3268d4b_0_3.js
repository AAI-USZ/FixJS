function() {
	var pragmaHeader = new PragmaHeader();

	$('#add').click(function() {
		pragmaHeader.addCommand();
	});

	$('#save').click(function() {
		pragmaHeader.saveCommand();
		return false;
	});

	$('#reset').click(function() {
		pragmaHeader.resetCommand();
	});
}