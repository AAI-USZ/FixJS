function( type, obj ) {
		return Object.prototype.toString.call( obj ) === "[object "+ type +"]";
	}