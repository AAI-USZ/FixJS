function() {
		// Set up local pointer to the embedPlayer
		var embedPlayer = this.embedPlayer;

		// Set up local controlBuilder
		var _this = this;

		// Remove any old controls & old overlays:
		embedPlayer.getInterface().find( '.control-bar,.overlay-win' ).remove();

		// Reset flags:
		_this.displayOptionsMenuFlag = false;

		// Setup the controlBar container ( starts hidden )
		var $controlBar = $('<div />')
			.addClass( 'ui-state-default ui-widget-header ui-helper-clearfix control-bar' )
			.css( 'height', this.height );

		// Controls are hidden by default if overlaying controls:
		if( _this.isOverlayControls() ){
			$controlBar.addClass('hover');
			$controlBar.hide();
		} else {
			// Include the control bar height when calculating the layout
			$controlBar.addClass('block');
		}

		// Make room for audio controls in the interface:
		if( embedPlayer.isAudio() && embedPlayer.getInterface().height() == 0 ){
			embedPlayer.getInterface().css( {
				'height' : this.height
			} );
		}

		// Add the controls to the interface
		embedPlayer.getInterface().append( $controlBar );

        if ( $.browser.mozilla && parseFloat( $.browser.version ) < 2 ) {
			embedPlayer.triggerHelper( 'resizeIframeContainer', [ {'height' : embedPlayer.height + $controlBar.height() - 1} ] );
        }

		// Add the Controls Component
		this.addControlComponents();

		// Add top level Controls bindings
		this.addControlBindings();
	}