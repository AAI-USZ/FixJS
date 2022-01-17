function() {
	expect( 1 );
	domEqual( "#slider1", function() {
		$( "#slider1" ).slider().slider( "destroy" );
	});
}