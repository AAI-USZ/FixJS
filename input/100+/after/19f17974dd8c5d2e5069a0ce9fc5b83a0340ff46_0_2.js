function(){
		if( mw.getConfig('EmbedPlayer.IsIframeServer' ) ){
			return {
				'height' : $(window).height(),
				'width' : $(window).width()
			}
		} else {
			return {
				'height' : this.embedPlayer.$interface.height(),
				'width' : this.embedPlayer.$interface.width()
			}
		}
	}