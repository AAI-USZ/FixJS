function() {
	equal( QUnit.jsDump.parse([1, 2]), "[\n  1,\n  2\n]" );
	equal( QUnit.jsDump.parse({top: 5, left: 0}), "{\n  \"left\": 0,\n  \"top\": 5\n}" );
	if (typeof document !== 'undefined' && document.getElementById("qunit-header")) {
		equal( QUnit.jsDump.parse(document.getElementById("qunit-header")), "<h1 id=\"qunit-header\"></h1>" );
		equal( QUnit.jsDump.parse(document.getElementsByTagName("h1")), "[\n  <h1 id=\"qunit-header\"></h1>\n]" );
	}
}