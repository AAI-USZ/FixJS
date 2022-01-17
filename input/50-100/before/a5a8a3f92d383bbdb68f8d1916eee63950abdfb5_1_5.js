function () {
		
		// Nothing to delete
		if( !this.get('id') ) {
			
			return;
		}
		
		(new PB.Request({
			
			url: this.getUrl(),
			async: false,
			method: 'DELETE'
		})).send();
	}