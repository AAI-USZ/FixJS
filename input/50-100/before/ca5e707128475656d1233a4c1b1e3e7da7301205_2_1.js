function() {
				var acStatus = kWidgetSupport.getAccessControlStatus( embedPlayer.kalturaAccessControl, embedPlayer );
				if( acStatus !== true ){
					embedPlayer.setError( acStatus );
					return ;
				}
				
				if( this.isRestricted() ) {
					embedPlayer.setError( this.getMsg() );
				}
			}