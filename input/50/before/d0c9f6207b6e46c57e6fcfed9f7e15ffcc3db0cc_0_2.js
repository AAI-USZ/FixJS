function( value ) {
		var match = this.getRestulSetMatch( value );

		return ( match === null )
			? value // not found, return string "unnormalized" but don't return null since it could still be valid!
			: match;
	}