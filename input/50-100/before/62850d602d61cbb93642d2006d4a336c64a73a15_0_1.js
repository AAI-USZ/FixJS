function() {
	// Restore the hint button
	jQuery( "#hint" )
		.switchClass( "green", "orange" )
		.val( "I'd like a hint" )
		.data( "buttonText", false )
		.stop( true /* clear */, true /* jump */ )
		.appendTo( "#get-hint-button-container" );

	jQuery( ".hint-box" ).show();
}