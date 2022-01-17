function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollTop( 10.5 ).scrollTop(), 11, "div scrollTop" );
	equal( textarea.scrollTop( 10.5 ).scrollTop(), 11, "textarea scrollTop" );
	equal( body.scrollTop( 10.5 ).scrollTop(), 11, "body scrollTop" );
	equal( iframe.scrollTop( 10.5 ).scrollTop(), 11, "iframe scrollTop" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
}