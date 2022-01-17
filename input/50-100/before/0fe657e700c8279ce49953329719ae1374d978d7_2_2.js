function() {

	expect(2);

	equal( jQuery("#text1").attr("value", function() { return this.id; })[0].value, "text1", "Set value from id" );

	equal( jQuery("#text1").attr("title", function(i) { return i; }).attr("title"), "0", "Set value with an index");

}