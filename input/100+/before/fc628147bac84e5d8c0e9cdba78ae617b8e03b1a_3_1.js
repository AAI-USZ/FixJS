function( field ) {
		var tmp = new Array();
		var max_count = 0;
		
		for( var dP in this.data ) {
			tmp[''+this.data[dP][field]+''] = 0;
		}	
		
		for( var dP in this.data ) {
			tmp[''+this.data[dP][field]+'']++;
		}
		
		for( var dP in tmp) {
			if( tmp[dP] > max_count )
				max_count = dP;
		}
		
		return max_count;
		
	}