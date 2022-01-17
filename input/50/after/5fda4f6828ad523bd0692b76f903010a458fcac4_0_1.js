function() {
		// workaround for core ticket #8381
		this.element.appendTo( "#qunit-fixture" );
		ok( this.element.is( "div" ), "generated div" );
		deepEqual( this.element.data( "ui-testWidget" ), this, "instance stored in .data()" );
	}