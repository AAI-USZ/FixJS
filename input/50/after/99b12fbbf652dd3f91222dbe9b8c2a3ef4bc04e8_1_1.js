function(){
		if ( this.torrent.isError() ) {
			this.$.status.setContent( "Error" );
		} else {
			this.$.status.setContent( this.torrent.getStatusString( ) );
		}
	}