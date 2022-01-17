function() {
	expect(3);

	// Test keyup at end of handle slide (keyboard)
	var el = $( "#slider1" )
		.slider({
			start: function(event, ui) {
				equal( event.originalEvent.type, "keydown", "start triggered by keydown" );
			},
			slide: function(event, ui) {
				ok( false, "Slider never triggered by keys" );
			},
			stop: function(event, ui) {
				equal( event.originalEvent.type, "keyup", "stop triggered by keyup" );
			},
			change: function(event, ui) {
				equal( event.originalEvent.type, "keyup", "change triggered by keyup" );
			}
		});

	el.find( ".ui-slider-handle" ).eq( 0 )
		.simulate( "keydown", { keyCode: $.ui.keyCode.LEFT } )
		.simulate( "keypress", { keyCode: $.ui.keyCode.LEFT } )
		.simulate( "keyup", { keyCode: $.ui.keyCode.LEFT } );

}