function() {
					if ( Ember.empty( this.getPath( 'content.title' ) ) ) {
						this.getPath( 'controller.content' ).removeObject(
							this.get( 'content' )
						);
					}
				}