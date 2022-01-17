function(data) {
		if( data.complete == true ) {
			this.onComplete(data);
		} else if( ! data.error ) {
			this.onIncrement(data);
		} else {
			this.onError(data);
		}
	}