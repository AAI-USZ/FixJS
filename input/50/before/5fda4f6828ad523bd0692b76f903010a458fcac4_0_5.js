function() {
		deepEqual( this.element[ 0 ], elem[ 0 ], "from selector" );
		deepEqual( elem.data( "testWidget" ), this, "instace stored in .data()" );
	}