function() {
	expect(6);
	var attributeNode = document.createAttribute("irrelevant"),
		commentNode = document.createComment("some comment"),
		textNode = document.createTextNode("some text"),
		obj = {};

	strictEqual( baidu( "#firstp" ).prop( "nonexisting", "foo" ).removeProp( "nonexisting" )[0]["nonexisting"], undefined, "removeprop works correctly on DOM element nodes" );

	baidu.each( [document, obj], function( i, ele ) {
		var $ele = baidu( ele );
		$ele.prop( "nonexisting", "foo" ).removeProp( "nonexisting" );
		strictEqual( ele["nonexisting"], undefined, "removeProp works correctly on non DOM element nodes (bug #7500)." );
	});
	baidu.each( [commentNode, textNode, attributeNode], function( i, ele ) {
		var $ele = baidu( ele );
		$ele.prop( "nonexisting", "foo" ).removeProp( "nonexisting" );
		strictEqual( ele["nonexisting"], undefined, "removeProp works correctly on non DOM element nodes (bug #7500)." );
	});
}