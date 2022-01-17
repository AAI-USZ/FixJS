function() {
	expect(3);

	equal( window.onbeforeunload, null, "window property is null/undefined up until now" );

	var handle = function () {};
	jQuery(window).on( "beforeunload", handle );

	equal( typeof window.onbeforeunload, "function", "window property is set to a function");

	jQuery(window).off( "beforeunload", handle );

	equal( window.onbeforeunload, null, "window property has been unset to null/undefined" );
}