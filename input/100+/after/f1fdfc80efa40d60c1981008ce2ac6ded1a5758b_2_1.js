function() {
	var container = jQuery("<div/>").width( 400 ).appendTo("#qunit-fixture"),
		el = jQuery("<div/>").css({ "width": "50%", "marginRight": "50%" }).appendTo( container ),
		el2 = jQuery("<div/>").css({ "width": "50%", "minWidth": "300px", "marginLeft": "25%" }).appendTo( container );

	equal( el.css("marginRight"), "200px", "css('marginRight') returning % instead of px, see #10639" );
	equal( el2.css("marginLeft"), "100px", "css('marginLeft') returning incorrect pixel value, see #12088" );
}