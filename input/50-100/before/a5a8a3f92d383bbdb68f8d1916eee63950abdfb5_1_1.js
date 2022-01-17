function ( id ) {
		
		if( !this.name ) {
			
			throw new Error('Model.name required');
		}
		
		if( !this.model ) {
			
			throw new Error('Model.model required for '+this.name);
		}
		
		// For internal use
		this.model.id = { type: 'number' };
		
		// Model data
		this.data = {};
		
		this.loaded = false;
		
		// Read if id given
		if( id !== undefined ) {
			
			this.set('id', id)
				.read( id );
		}
	}