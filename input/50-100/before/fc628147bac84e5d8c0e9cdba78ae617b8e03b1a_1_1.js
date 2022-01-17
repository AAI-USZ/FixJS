function( field ) {
		var max = this.data[0][field];
		for( var dP in this.data ) {
			if( this.data[dP][field] > max )
				max = this.data[dP][field];
		}
		
		return max;
	}