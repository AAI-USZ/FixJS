function() {
	$.widget( "ui.testWidget", {
		_create: function() {}
	});

	$( "#widget" ).testWidget({
		foo: function( event, ui ) {
			return false;
		}
	});
	deepEqual( $( "#widget" ).data( "ui-testWidget" )._trigger( "foo" ), false,
		"_trigger returns false when callback returns false" );
}