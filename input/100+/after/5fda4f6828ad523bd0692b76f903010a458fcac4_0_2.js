function() {
	var elem = $( "<div>" ).appendTo( "#qunit-fixture" );
	$.widget( "ui.testWidget", {} );
	elem.testWidget();
	deepEqual( $( ":ui-testWidget" )[0], elem[0] );
	elem.testWidget( "destroy" );
}