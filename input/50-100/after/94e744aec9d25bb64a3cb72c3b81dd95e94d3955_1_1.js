function() {
	expect(1);
	var markup = jQuery( '<ul><li><ul id="u1"><li id="f1"></li></ul></li>' ).appendTo("body");
	
	markup
		.find("#u1")
			.on( "click", "li:first", function() {
				ok( this.id === "f1" , "first li under #u1 was clicked" );
			})
			.find("#f1").click().end()
		.end()
		.remove();
}