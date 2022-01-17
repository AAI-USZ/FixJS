function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollLeft( 10.5 ).scrollLeft(), 11, "div scrollLeft" );
	equal( textarea.scrollLeft( 10.5 ).scrollLeft(), 11, "textarea scrollLeft" );
	equal( body.scrollLeft( 10.5 ).scrollLeft(), 11, "body scrollLeft" );
	equal( iframe.scrollLeft( 10.5 ).scrollLeft(), 11, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
}