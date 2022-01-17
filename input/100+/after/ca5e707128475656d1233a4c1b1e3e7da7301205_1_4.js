function( embedPlayer ){

		var _this = this;

		var getAttr = function( attrName ){

			return _this.getPluginConfig( embedPlayer, '', attrName );

		}

		// Check for autoplay:

		var autoPlay = getAttr( 'autoPlay' );

		if( autoPlay ){

			embedPlayer.autoplay = true;

		}



		// Check for loop:

		var loop = getAttr( 'loop' );

		if( loop ){

			embedPlayer.loop = true;

		}



		// Check if errors / alerts should be displayed: 

		if( getAttr( 'disableAlerts' ) ){

			mw.setConfig('EmbedPlayer.ShowPlayerAlerts', false );

		}

		

		// Check for dissable bit rate cookie and overide default bandwidth cookie

		if( getAttr( 'disableBitrateCookie' ) && getAttr( 'mediaProxy.preferedFlavorBR') ){

			$.cookie('EmbedPlayer.UserBandwidth', getAttr( 'mediaProxy.preferedFlavorBR') * 1000 );

		}



		// Check for imageDefaultDuration

		var imageDuration = getAttr( 'imageDefaultDuration' );

		if( imageDuration ){

			embedPlayer.imageDuration = imageDuration;

		}



		// Check for mediaPlayFrom

		var mediaPlayFrom = embedPlayer.evaluate('{mediaProxy.mediaPlayFrom}');

		if( mediaPlayFrom ) {

			embedPlayer.startTime = parseFloat( mediaPlayFrom );

		}

		// Check for mediaPlayTo

		var mediaPlayTo = embedPlayer.evaluate('{mediaProxy.mediaPlayTo}');

		if( mediaPlayTo ) {

			embedPlayer.pauseTime = parseFloat( mediaPlayTo );

		}

		

		// Check for end screen play or "replay" button:

		// TODO more complete endscreen support by doing basic layout of end screen!!!

		if( embedPlayer.$uiConf.find( '#endScreen' ).find('button[command="play"],button[kclick="sendNotification(\'doPlay\')"]' ).length == 0 ){

			// no end play button

			$( embedPlayer ).data('hideEndPlayButton', true );

		} else{

			$( embedPlayer ).data('hideEndPlayButton', false );

		}

	}