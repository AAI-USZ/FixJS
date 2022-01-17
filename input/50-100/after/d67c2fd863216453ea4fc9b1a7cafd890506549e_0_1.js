function() {
	expect(2);

	var svg = jQuery(
			'<svg height="1" version="1.1" width="1" xmlns="http://www.w3.org/2000/svg">'+
			'<rect class="svg-by-class" x="10" y="20" width="100" height="60" r="10" rx="10" ry="10"></rect>'+
			'<rect id="svg-by-id" x="10" y="20" width="100" height="60" r="10" rx="10" ry="10"></rect>'+
			'</svg>'
		).appendTo( "body" );

	jQuery( "body" )
		.on( "click", "#svg-by-id", function() {
			ok( true, "delegated id selector" );
		})
		.on( "click", "[class='svg-by-class']", function() {
			ok( true, "delegated class selector" );
		})
		.find( "#svg-by-id, [class='svg-by-class']" )
			.trigger( "click" )
		.end()
		.off( "click" );

	svg.remove();
}