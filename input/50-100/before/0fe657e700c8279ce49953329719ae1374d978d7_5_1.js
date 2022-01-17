function() {
	expect(2);

	var old = "This link has class=\"blog\": Simon Willison's Weblog";

	jQuery("#sap").text(function(i, val) {
		equal( val, old, "Make sure the incoming value is correct." );
		return "foobar";
	});

	equal( jQuery("#sap").text(), "foobar", "Check for merged text of more then one element." );

	QUnit.reset();
}