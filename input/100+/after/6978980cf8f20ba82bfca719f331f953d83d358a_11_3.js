function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( NaN ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( NaN ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( NaN ).scrollLeft(), 0, "body scrollLeft" );
//	equal( iframe.scrollLeft( NaN ).scrollLeft(), 0, "iframe scrollLeft" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}