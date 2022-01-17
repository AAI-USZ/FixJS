function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( 10.5 ).scrollTop(), 10, "div scrollTop" );
	equal( textarea.scrollTop( 10.5 ).scrollTop(), 10, "textarea scrollTop" );
//	equal( body.scrollTop( 10.5 ).scrollTop(), 11, "body scrollTop" );
//	equal( iframe.scrollTop( 10.5 ).scrollTop(), 11, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}