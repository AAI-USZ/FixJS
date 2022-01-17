function(){
		if( !this.$interface ){		
			var interfaceCss = {
				'width' : this.width + 'px',
				'height' : this.height + 'px',
				'position' : 'absolute',
				'top' : '0px',
				'left' : '0px',
				'z-index': 1,
				'background': null
			};
			// if using "native" interface don't do any pointer events:
			if( !this.useLargePlayBtn() ){
				interfaceCss['pointer-events'] = 'none';
			}
			
			if( !mw.getConfig( 'EmbedPlayer.IsIframeServer' ) ){
				interfaceCss['position'] = 'relative';
			}
			// Make sure we have mwplayer_interface
			$( this ).wrap(
				$('<div />')
				.addClass( 'mwplayer_interface ' + this.controlBuilder.playerClass )
				.css( interfaceCss )
			)
			// position the "player" absolute inside the relative interface
			// parent:
			.css('position', 'absolute');
		}
		this.$interface = $( this ).parent( '.mwplayer_interface' );
		return this.$interface;
	}