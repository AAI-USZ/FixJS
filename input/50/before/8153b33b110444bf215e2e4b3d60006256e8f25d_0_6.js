function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	}