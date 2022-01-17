function() {
					if ( Ember.empty( this.getPath( 'content.title' ) ) ) {
						this.getPath( 'controller.content' ).removeObject(
							this.get( 'content' )
						);
					}else{
						this.get('content').set('title', this.getPath('content.title').trim());
					}
				}