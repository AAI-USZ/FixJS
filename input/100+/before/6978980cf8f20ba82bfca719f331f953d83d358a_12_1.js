function(){
	var div, textarea, body, iframe;

	div = create( "div", 100, 100 );
	textarea = create( "textarea", 100, 100 );
	body = create( "body", 100, 100 );
	iframe = create( "iframe", 100, 100 );

	equal( div.scrollTop(), 100, "div scrollTop" );
	equal( textarea.scrollTop(), 100, "textarea scrollTop" );
	equal( body.scrollTop(), 100, "body scrollTop" );
	equal( iframe.scrollTop(), 100, "iframe scrollTop" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
}