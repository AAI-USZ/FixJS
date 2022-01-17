function( error, newSettings ){
		if( error){
			callback(error, null);
		}
		else {
			callback(null, newSettings);
		}
	}