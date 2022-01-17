function() {
	expect(5);
	var expected = "This link has class=\"blog\": Simon Willison's Weblog";
	equal( jQuery("#sap").text(), expected, "Check for merged text of more then one element." );

	// Check serialization of text values
	equal( jQuery(document.createTextNode("foo")).text(), "foo", "Text node was retreived from .text()." );
	notEqual( jQuery(document).text(), "", "Retrieving text for the document retrieves all text (#10724).");

	// Retrieve from document fragments #10864
	var frag = document.createDocumentFragment();
		frag.appendChild( document.createTextNode("foo") );

	equal( jQuery( frag ).text(), "foo", "Document Fragment Text node was retreived from .text().");

	var $newLineTest = jQuery("<div>test<br/>testy</div>").appendTo("#moretests");
	$newLineTest.find("br").replaceWith("\n");
	equal( $newLineTest.text(), "test\ntesty", "text() does not remove new lines (#11153)" );

	$newLineTest.remove();
}