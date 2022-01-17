function() {
					if ( typeof this._interfaces !== null ) {
						this._interfaces.siteId.setActive( this.isPending() );
					}
				}