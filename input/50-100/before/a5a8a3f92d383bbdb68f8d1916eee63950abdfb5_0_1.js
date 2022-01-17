function ( key, value ) {

		if( key === 'id' ) {

			this.loaded = true;
		}

		if( this.properties && this.properties[key] && this.properties[key].set ) {

			value = this.properties[key].set( value, this.data[key] );
		}

		this.data[key] = value;

		return this;
	}