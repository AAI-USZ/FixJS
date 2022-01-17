function() {
		deepEqual( this.element[ 0 ], elem[ 0 ], "from jQuery object" );
		deepEqual( elem.data( "testWidget" ), this, "instace stored in .data()" );
	}