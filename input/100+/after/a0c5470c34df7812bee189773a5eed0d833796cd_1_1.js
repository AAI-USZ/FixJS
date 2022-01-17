function( alertObj ) {
		var embedPlayer = this.embedPlayer;
        var callback;
		mw.log( 'PlayerControlBuilder::displayAlert:: ' + alertObj.title );
        // Check if callback is external or internal (Internal by default)

        // Check if overlay window is already present:
		if ( embedPlayer.$interface.find( '.overlay-win' ).length != 0 ) {
            return;
        }
        if( typeof alertObj.callbackFunction == 'string' ) {
            if ( alertObj.isExternal ) {
                // TODO better support of running external JS functions, instead of window.parent
                callback = window.parent[ alertObj.callbackFunction ];
            } else {
                callback = window[ alertObj.callbackFunction ];
            }
        } else if( typeof alertObj.callbackFunction == 'function' ) {
            // Make life easier for internal usage of the listener mapping by supporting
            // passing a callback by function ref
            callback = alertObj.callbackFunction;
        } else {
            mw.log( "PlayerControlBuilder :: displayAlert :: Error: bad callback type" );
            callback = function() {};
        }

        var $container = $( '<div />' ).attr( 'id', 'alertContainer' ).addClass( 'alert-container' );
        var $title = $( '<div />' ).text( alertObj.title ).addClass( 'alert-title alert-text' );
        if ( alertObj.props && alertObj.props.titleTextColor ) {
            $title.removeClass( 'alert-text' );
            $title.css( 'color', mw.getHexColor( alertObj.props.titleTextColor ) );
        }
        var $message = $( '<div />' ).text( alertObj.message ).addClass( 'alert-message alert-text' );
		if ( alertObj.isError ) {
			$message.addClass( 'error' );
		}
        if ( alertObj.props && alertObj.props.textColor ) {
            $message.removeClass( 'alert-text' );
            $message.css( 'color', mw.getHexColor( alertObj.props.textColor ) );
        }
        var $buttonsContainer = $( '<div />' ).addClass( 'alert-buttons-container' );
        if ( alertObj.props && alertObj.props.buttonRowSpacing ) {
            $buttonsContainer.css( 'margin-top', alertObj.props.buttonRowSpacing );
        }
        var $buttonSet = alertObj.buttons || [];

        // If no button was passed display just OK button
        var buttonsNum = $buttonSet.length;
        if ( buttonsNum == 0 && !alertObj.noButtons ) {
            $buttonSet = ["OK"];
            buttonsNum++;
        }

        $.each( $buttonSet, function(i) {
            var label = this.toString();
            var $currentButton = $( '<button />' )
                .addClass( 'alert-button' )
                .text( label )
                .click( function( eventObject ) {
                    callback( eventObject );
                    embedPlayer.controlBuilder.closeAlert( alertObj.keepOverlay );
                } );
            if ( alertObj.props && alertObj.props.buttonHeight ) {
                $currentButton.css( 'height', alertObj.props.buttonHeight );
            }
            // Apply buttons spacing only when more than one is present
            if (buttonsNum > 1) {
                if (i < buttonsNum-1) {
                    if ( alertObj.props && alertObj.props.buttonSpacing ) {
                        $currentButton.css( 'margin-right', alertObj.props.buttonSpacing );
                    }
                }
            }
            $buttonsContainer.append( $currentButton );
        } )
        $container.append( $title, $message, $buttonsContainer );
        return embedPlayer.controlBuilder.displayMenuOverlay( $container, false, true );
    }