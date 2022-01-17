function() {
		deepEqual( this.element[ 0 ], elem[ 0 ], "from selector" );
		deepEqual( elem.data( "ui-testWidget" ), this, "instace stored in .data()" );
	}