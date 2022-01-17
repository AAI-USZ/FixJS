function() {
		// workaround for core ticket #8381
		this.element.appendTo( "#qunit-fixture" );
		ok( this.element.is( "div" ), "generated div" );
		deepEqual( this.element.data( "testWidget" ), this, "intance stored in .data()" );
	}