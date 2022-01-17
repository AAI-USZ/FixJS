function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( 100 ).scrollTop(), 100, "div scrollTop" );
	equal( textarea.scrollTop( 100 ).scrollTop(), 100, "textarea scrollTop" );
//	equal( body.scrollTop( 100 ).scrollTop(), 100, "body scrollTop" );
//	equal( iframe.scrollTop( 100 ).scrollTop(), 100, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}