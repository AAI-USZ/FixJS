function() {
	expect(4);

	var el = $( "<div></div>" )
		.appendTo( "body" )
		.slider({
			start: function(event, ui) {
				equal( event.originalEvent.type, "mousedown", "start triggered by mousedown" );
			},
			slide: function(event, ui) {
				equal( event.originalEvent.type, "mousemove", "slider triggered by mousemove" );
			},
			stop: function(event, ui) {
				equal( event.originalEvent.type, "mouseup", "stop triggered by mouseup" );
			},
			change: function(event, ui) {
				equal( event.originalEvent.type, "mouseup", "change triggered by mouseup" );
			}
		});

	el.find( ".ui-slider-handle" ).eq( 0 )
		.simulate( "drag", { dx: 10, dy: 10 } );

}