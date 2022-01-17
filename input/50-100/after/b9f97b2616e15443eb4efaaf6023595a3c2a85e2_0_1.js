function(data) {
		if( data.complete == true ) {
			this.onUpdateComplete(data);
		} else if( ! data.error ) {
			this.onUpdateIncrement(data);
		} else {
			this.onUpdateError(data);
		}
	}