function() {
	expect( 7 );
	var handlers = [];

	$.widget( "ui.testWidget", {
		_create: function() {}
	});

	$( "#widget" ).testWidget({
		foo: function( event, ui ) {
			deepEqual( event.type, "testwidgetfoo", "correct event type in callback" );
			deepEqual( ui, {}, "empty ui hash passed" );
			handlers.push( "callback" );
		}
	});
	$( document ).add( "#widget-wrapper" ).add( "#widget" )
		.bind( "testwidgetfoo", function( event, ui ) {
			deepEqual( ui, {}, "empty ui hash passed" );
			handlers.push( this );
		});
	deepEqual( $( "#widget" ).data( "ui-testWidget" )._trigger( "foo" ), true,
		"_trigger returns true when event is not cancelled" );
	deepEqual( handlers, [
		$( "#widget" )[ 0 ],
		$( "#widget-wrapper" )[ 0 ],
		document,
		"callback"
	], "event bubbles and then invokes callback" );

	$( document ).unbind( "testwidgetfoo" );
}