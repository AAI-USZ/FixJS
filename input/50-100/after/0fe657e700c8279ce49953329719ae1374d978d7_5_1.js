function() {
	expect(2);

	var old = "This link has class=\"blog\": Simon Willison's Weblog";

	baidu("#sap").text(function(i, val) {
		equal( val, old, "Make sure the incoming value is correct." );
		return "foobar";
	});

	equal( baidu("#sap").text(), "foobar", "Check for merged text of more then one element." );

	QUnit.reset();
}