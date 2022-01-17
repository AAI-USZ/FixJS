function () {
		
		// Nothing to delete
		if( !this.get('id') ) {
			
			return this.error('Failed to fetch `'+this.name+'`, no id set!');
		}
		
		(new PB.Request({

			url: this.getUrl(),
			async: false
		})).on('end', function ( t, status ){

			switch ( status ) {

				case 200:
					if( !t.responseJSON ) {
						
						this.error('No valid JSON response');
					}
				
					this.setData( t.responseJSON );
					break;

				default:
					this.error('Error in fetching `Model '+this.name+'`');
					break;
			}
		}, this).send();

		return this;
	}