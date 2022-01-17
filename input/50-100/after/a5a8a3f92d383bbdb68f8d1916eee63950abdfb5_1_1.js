function ( id ) {
		
		if( !this.name ) {
			
			return this.error('Model.name required');
		}
		
		this.parent();
		
		// Model data
		this.data = {};
		this.previousData = {};
		
		// Fetch if id given
		if( id !== undefined ) {
			
			this.set('id', id)
				.fetch();
		}
	}