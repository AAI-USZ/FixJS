function() {
	expect(1);
	//expect(6);
	var attributeNode = document.createAttribute("irrelevant"),
		commentNode = document.createComment("some comment"),
		textNode = document.createTextNode("some text"),
		obj = {};
	strictEqual( baidu( "#firstp" ).prop( "nonexisting", "foo" ).removeProp( "nonexisting" )[0]["nonexisting"], undefined, "removeprop works correctly on DOM element nodes" );

	//修改
	// baidu.each( [document, obj], function( ele,i ) {
	// 	var $ele = baidu( ele );
	// 	$ele.prop( "nonexisting", "foo" ).removeProp( "nonexisting" );
	// 	strictEqual( ele["nonexisting"], undefined, "removeProp works correctly on non DOM element nodes (bug #7500)." );
	// });
	// baidu.each( [commentNode, textNode, attributeNode], function( ele,i ) {
	// 	var $ele = baidu( ele );
	// 	$ele.prop( "nonexisting", "foo" ).removeProp( "nonexisting" );
	// 	strictEqual( ele["nonexisting"], undefined, "removeProp works correctly on non DOM element nodes (bug #7500)." );
	// });
}