function( field ) {
		var mean = 0;
		
		for( var dP in this.data ) {
			mean += this.data[dP][field];
		}
		

		
		return (mean / this.data.length);
	}