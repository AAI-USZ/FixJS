function() {
	var container = jQuery( "<div/>" ).width(400).appendTo( "#qunit-fixture" ),
		el = jQuery( "<div/>" ).css({ "width": "50%", "marginRight": "50%" }).appendTo( container );

	equal( el.outerWidth(true), 400, "outerWidth(true) and css('margin') returning % instead of px in Webkit, see #10639" );
}