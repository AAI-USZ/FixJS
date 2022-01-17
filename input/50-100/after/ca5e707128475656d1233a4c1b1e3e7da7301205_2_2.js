function() {
			if( this.getConfig( 'restrictedUserAgentTitle' ) && this.getConfig( 'restrictedUserAgentMessage' ) ) {
				return { 
					'message' : this.getConfig( 'restrictedUserAgentMessage' ),
					'title': this.getConfig( 'restrictedUserAgentTitle' )
				}
			} else {
				return this.embedPlayer.getKalturaMsgObject( 'USER_AGENT_RESTRICTED' );
			}
		}