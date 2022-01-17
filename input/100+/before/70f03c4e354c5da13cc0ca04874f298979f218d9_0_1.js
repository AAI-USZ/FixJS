f	expect( 18 );

	function broken( name, selector ) {
		raises(function() {
			Sizzle( selector );
		}, function( e ) {
			return e.message.indexOf("Syntax error") >= 0;
		}, name + ": " + selector );
	}

	broken( "Broken Selector", "[" );
	broken( "Broken Selector", "(" );
	broken( "Broken Selector", "{" );
	broken( "Broken Selector", "<" );
	broken( "Broken Selector", "()" );
	broken( "Broken Selector", "<>" );
	broken( "Broken Selector", "{}" );
	broken( "Doesn't exist", ":visble" );
	broken( "Nth-child", ":nth-child" );
	// Sigh again. IE 9 thinks this is also a real selector
	// not super critical that we fix this case
	//broken( "Nth-child", ":nth-child(-)" );
	// Sigh. WebKit thinks this is a real selector in qSA
	// They've already fixed this and it'll be coming into
	// current browsers soon. Currently, Safari 5.0 still has this problem
	// broken( "Nth-child", ":nth-child(asdf)", [] );
	broken( "Nth-child", ":nth-child(2n+-0)" );
	broken( "Nth-child", ":nth-child(2+0)" );
	broken( "Nth-child", ":nth-child(- 1n)" );
	broken( "Nth-child", ":nth-child(-1 n)" );
	broken( "First-child", ":first-child(n)" );
	broken( "Last-child", ":last-child(n)" );
	broken( "Only-child", ":only-child(n)" );

	// Make sure attribute value quoting works correctly. See: #6093
	var attrbad = jQuery('<input type="hidden" value="2" name="foo.baz" id="attrbad1"/><input type="hidden" value="2" name="foo[baz]" id="attrbad2"/>').appendTo("body");

	broken( "Attribute not escaped", "input[name=foo.baz]", [] );
	// Shouldn't be matching those inner brackets
	broken( "Attribute not escaped", "input[name=foo[baz]]", [] );

	attrbad.remove();
});
