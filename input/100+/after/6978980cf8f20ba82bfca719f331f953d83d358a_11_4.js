function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( -100 ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( -100 ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( 100 ).scrollLeft( -100 ).scrollLeft(), 100, "body scrollLeft" );
//	equal( iframe.scrollLeft( -100 ).scrollLeft(), 0, "iframe scrollLeft" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}