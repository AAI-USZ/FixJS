function () {
		
		if( this.loaded ) {
			
			return;
		}
		
		// Nothing to delete
		if( !this.get('id') ) {
			
			throw new Error('Failed to read `'+this.name+'`, no id set!');
		}
		
		(new PB.Request({

			url: this.getUrl(),
			async: false
		})).on('end', function ( t, code ){

			switch ( code ) {

				case 200:
					if( !t.responseJSON ) {
						
						throw new Error('No valid JSON response');
					}
				
					this.set( t.responseJSON );
					break;

				default:
					throw new Error('Error in reading `Model '+this.name+'`');
					break;
			}
		}.bind(this)).send();

		return this;
	}