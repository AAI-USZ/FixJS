function() {
			var embedPlayer = this.embedPlayer;
			embedPlayer.bindHelper( 'KalturaSupport_EntryDataReady', function() {
				var acStatus = kWidgetSupport.getAccessControlStatus( embedPlayer.kalturaAccessControl, embedPlayer );
				if( acStatus !== true ){
					embedPlayer.setError( acStatus );
					return ;
				}
				
				if( this.isRestricted() ) {
					embedPlayer.setError( this.getMsgObject() );
				}
			});
		}