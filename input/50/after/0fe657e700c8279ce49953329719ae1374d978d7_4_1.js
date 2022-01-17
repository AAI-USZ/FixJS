function( i, ele ) {
		var $ele = baidu( ele );
		$ele.prop( "nonexisting", "foo" ).removeProp( "nonexisting" );
		strictEqual( ele["nonexisting"], undefined, "removeProp works correctly on non DOM element nodes (bug #7500)." );
	}