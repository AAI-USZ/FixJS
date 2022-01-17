function(){
		var _this = this;
		// Don't add the recive api if already defined for this player proxy id
		if( !window['perPlayerIdReciveApi'][ this.playerProxy.id ] ){
			window['perPlayerIdReciveApi'][ this.playerProxy.id ] = true;
			// Set the flag for the current global message receiver 
			$.receiveMessage( function( event ){
				_this.handleReceiveMessage( event );
			}, this.iframeServer);
		}
	}