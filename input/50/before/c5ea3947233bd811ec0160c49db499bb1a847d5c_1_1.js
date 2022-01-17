function() {
	expect(2);

	var result = jQuery( document.createElement("div") ).offset();

	equal( result.top, 0, "Check top" );
	equal( result.left, 0, "Check left" );
}