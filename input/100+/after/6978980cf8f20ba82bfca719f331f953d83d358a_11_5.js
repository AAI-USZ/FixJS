function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( 10.5 ).scrollLeft(), 10, "div scrollLeft" );//保持和jq一致
	equal( textarea.scrollLeft( 10.5 ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( 10.5 ).scrollLeft(), 11, "body scrollLeft" );
//	equal( iframe.scrollLeft( 10.5 ).scrollLeft(), 11, "iframe scrollLeft" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}