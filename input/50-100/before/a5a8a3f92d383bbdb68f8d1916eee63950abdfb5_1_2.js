function ( key, value ) {
		
		if( key === 'id' ) {
			
			// Asume an existing object, so set loaded to true
			this.loaded = true;
		}
		
		if( this.properties && this.properties[key] && this.properties[key].set ) {
			
			value = this.properties[key].set( value, this.data[key] );
		}
		
		this.data[key] = value;
		
		return this;
	}