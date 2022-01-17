function(){
	var div, textarea, body, iframe;

	div = create( "div", 100, 100 );
	textarea = create( "textarea", 100, 100 );
//	body = create( "body", 100, 100 );
//	iframe = create( "iframe", 100, 100 );

	equal( div.scrollLeft(), 100, "div scrollLeft" );
	equal( textarea.scrollLeft(), 0, "textarea scrollLeft" );//textarea没有横向滚动条
//	equal( body.scrollLeft(), 100, "body scrollLeft" );
//	equal( iframe.scrollLeft(), 100, "iframe scrollLeft" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
}