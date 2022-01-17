function() {
	expect(2);
	var markup = jQuery("<ul><li><a id=\"a0\"></a><ul id=\"ul0\"><li><a id=\"a0_0\"></a></li><li><a id=\"a0_1\"></a></li></ul></li></ul>").appendTo("#qunit-fixture");

	markup
		.on( "click", ">li>a", function() {
			ok( this.id === "a0", "child li was clicked" );
		})
		.find("#ul0")
			.on( "click", "li:first>a", function() {
				ok( this.id === "a0_0" , "first li under #u10 was clicked" );
			})
		.end()
		.find("a").click().end()
		.remove();
}