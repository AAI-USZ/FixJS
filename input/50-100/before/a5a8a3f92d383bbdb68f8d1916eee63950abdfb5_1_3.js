function ( key ) {
		
		var value = this.data[key];
		
		if( value === undefined ) {
			
			return null;
		}
		
		if( this.properties && this.properties[key] && this.properties[key].get ) {
			
			value = this.properties[key].get( value );
		}
		
		return value;
	}