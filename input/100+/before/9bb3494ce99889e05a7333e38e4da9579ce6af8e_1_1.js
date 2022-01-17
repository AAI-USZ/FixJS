function() {

	expect(5);

	var event = jQuery.Event( "keydown", { keyCode: 64 }),
			handler = function( event ) {
				ok( "keyCode" in event, "Special property 'keyCode' exists" );
				equal( event.keyCode, 64, "event.keyCode has explicit value '64'" );
			};

	// Supports jQuery.Event implementation
	equal( event.type, "keydown", "Verify type" );

	// ensure "type" in props won't clobber the one set by constructor
	equal( jQuery.inArray("type", jQuery.event.props), -1, "'type' property not in props (#10375)" );

	ok( "keyCode" in event, "Special 'keyCode' property exists" );

	jQuery("body").bind( "keydown", handler ).trigger( event );

	jQuery("body").unbind( "keydown" );

}