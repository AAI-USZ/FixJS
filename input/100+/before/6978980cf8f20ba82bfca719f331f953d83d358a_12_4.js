function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollTop( -100 ).scrollTop(), 0, "div scrollTop" );
	equal( textarea.scrollTop( -100 ).scrollTop(), 0, "textarea scrollTop" );
	equal( body.scrollTop( 100 ).scrollTop( -100 ).scrollTop(), 100, "body scrollTop" );
	equal( iframe.scrollTop( -100 ).scrollTop(), 0, "iframe scrollTop" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
}