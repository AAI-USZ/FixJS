function() {
			if( this.getConfig( 'restrictedUserAgentTitle' ) && this.getConfig( 'restrictedUserAgentMessage' ) ) {
				return this.getConfig( 'restrictedUserAgentTitle' ) + "\n" + this.getConfig( 'restrictedUserAgentMessage' );
			} else {
				return this.embedPlayer.getKalturaMsg( 'USER_AGENT_RESTRICTED' );
			}
		}