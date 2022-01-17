function() {
	expect(1);

	var markup = jQuery( '<div><p><a href="#">target</a></p></div>' );
	markup
		.on( "click", function() {
			ok( false, "directly-bound event on delegate target was called" );
		})
		.on( "click", "a", function( e ) {
			e.stopPropagation();
			ok( true, "delegated handler was called" );
		})
		.find("a").click().end()
		.remove();
}