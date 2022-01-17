function ( event ) {
		event.preventDefault();
		
		// send attributes to trigger cloning
		YJ.dispatch.trigger( 'videoAdd', this.model.attributes );
	}