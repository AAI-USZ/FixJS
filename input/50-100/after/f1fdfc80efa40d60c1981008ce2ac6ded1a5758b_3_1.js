function() {
	expect( 1 );

	var table = jQuery("<table><tbody><tr><td></td><td>a</td></tr><tr><td></td><td>a</td></tr></tbody></table>").appendTo("#qunit-fixture"),
		elem = table.find("tr:eq(0) td:eq(0)");

	table.find("td").css({ "margin": 0, "padding": 0 });
	equal( elem.width(), elem.width(), "width() doesn't alter dimension values" );
}