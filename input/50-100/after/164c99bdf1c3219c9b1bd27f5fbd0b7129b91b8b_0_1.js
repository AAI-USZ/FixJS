function( event, callback ){
			var iframeUrl = mw.getMwEmbedPath() + 'mwEmbedFrame.php';
			iframeUrl +='/wid/' + embedPlayer.kwidgetid +
				'/uiconf_id/' + embedPlayer.kuiconfid +
				'/entry_id/' + embedPlayer.kentryid + '/' + 
				'?' + kWidget.flashVarsToUrl( embedPlayer.getFlashvars() );
			// return the iframeUrl via the callback: 
			callback( iframeUrl );
		}