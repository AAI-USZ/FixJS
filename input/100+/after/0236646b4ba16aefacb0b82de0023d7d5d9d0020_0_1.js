function( field ) {
		var tmp = new Array();
		var max_count = 0;
		var max_index = null;
		
		//Init
		for( var dP in this.data ) {
			
			tmp[this.data[dP][field].toString()] = 0;
		}	
		
		//Count repeats
		for( var dP in this.data ) {

			tmp[this.data[dP][field].toString()] += 1;
		}
		
		//Pick Best
		for (var key in tmp) {
			if (tmp[key] > max_count) {
				max_index = key;
				max_count = tmp[key];
			}
		}
		
		return Number(max_index);
		
	}