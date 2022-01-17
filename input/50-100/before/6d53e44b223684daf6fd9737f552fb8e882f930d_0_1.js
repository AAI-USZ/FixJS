function( color ) {
		return this.toHSLString( true ) === new Color( color ).toHSLString( true );
	}