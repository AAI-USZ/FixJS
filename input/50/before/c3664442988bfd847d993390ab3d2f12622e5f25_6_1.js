function ( event ) {
		event.preventDefault();
		this.model.collection.remove( this.model );
	}