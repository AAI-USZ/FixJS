function(updateStatusData) {
		if( data.complete == true ) {
			this.onUpdateComplete(updateStatusData);
		} else if( ! data.error ) {
			this.onUpdateIncrement(updateStatusData);
		} else {
			this.onUpdateError(updateStatusData);
		}
	}