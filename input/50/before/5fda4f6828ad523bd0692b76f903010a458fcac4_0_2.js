function() {
		ok( this.element.is( "span[data-test=pass]" ), "generated span with properties" );
		deepEqual( this.element.data( "testWidget" ), this, "instace stored in .data()" );
	}