function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollTop( NaN ).scrollTop(), 0, "div scrollTop" );
	equal( textarea.scrollTop( NaN ).scrollTop(), 0, "textarea scrollTop" );
	equal( body.scrollTop( NaN ).scrollTop(), 0, "body scrollTop" );
	equal( iframe.scrollTop( NaN ).scrollTop(), 0, "iframe scrollTop" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
}