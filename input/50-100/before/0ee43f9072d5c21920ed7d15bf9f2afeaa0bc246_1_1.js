function(){
		var _this = this;
		// Don't add the recive api if already defined for this player proxy id
		if( $( '#' + this.playerProxy.id ).data('hasPlayerReciveApi') ){
			mw.log("Error trying to add player api for:" + this.playerProxy.id + " that already has one");
			return ;
		}
		 $( '#' + this.playerProxy.id ).data('hasPlayerReciveApi', true);
		// Set the flag for the current global message receiver 
		$.receiveMessage( function( event ){
			_this.handleReceiveMessage( event );
		}, this.iframeServer);
	}