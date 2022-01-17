function( ) {
		var _this = this;

		// Set up local pointer to the embedPlayer
		var embedPlayer = this.embedPlayer;

		//Set up local var to control container:
		var $controlBar = embedPlayer.getInterface().find( '.control-bar' );

		this.availableWidth = embedPlayer.getPlayerWidth();

		mw.log( 'PlayerControlsBuilder:: addControlComponents into:' + this.availableWidth );
		// Build the supportedComponents list
		this.supportedComponents = $.extend( this.supportedComponents, embedPlayer.supports );

		// Check for Attribution button
		if( mw.getConfig( 'EmbedPlayer.AttributionButton' ) && embedPlayer.attributionbutton ){
			this.supportedComponents[ 'attributionButton' ] = true;
		}
		// Check global fullscreen enabled flag
		if( mw.getConfig( 'EmbedPlayer.EnableFullscreen' ) === false ){
			this.supportedComponents[ 'fullscreen'] = false;
		}
		// Check if the options item is available
		if( mw.getConfig( 'EmbedPlayer.EnableOptionsMenu' ) === false ){
			this.supportedComponents[ 'options'] = false;
		}
		// Check for volume control
		if( mw.getConfig( 'EmbedPlayer.EnableVolumeControl') === false ){
			this.supportedComponents[ 'volumeControl'] = false;
		}

		// Check if we have multiple playable sources ( if only one source don't display source switch )
		if( embedPlayer.mediaElement.getPlayableSources().length == 1 ){
			this.supportedComponents[ 'sourceSwitch'] = false;
		}

		$( embedPlayer ).trigger( 'addControlBarComponent', this );

		var addComponent = function( componentId ){
			if ( _this.supportedComponents[ componentId ] ) {
				if ( _this.availableWidth > _this.components[ componentId ].w ) {
					// Append the component
					$controlBar.append(
						_this.getComponent( componentId )
					);
					_this.availableWidth -= _this.components[ componentId ].w;
					//mw.log(" availableWidth:" + _this.availableWidth + ' ' + componentId + ' took: ' +  _this.components[ componentId ].w )
				} else {
					mw.log( 'PlayerControlBuilder:: Not enough space for control component:' + componentId );
				}
			}
		};

		// Output components
		for ( var componentId in this.components ) {
			// Check for (component === false ) and skip
			if( this.components[ componentId ] === false ){
				continue;
			}

			// Special case with playhead and time ( to make sure they are to the left of everything else )
			if ( componentId == 'playHead' || componentId == 'timeDisplay'){
				continue;
			}

			// Skip "fullscreen" button for assets or where height is 0px ( audio )
			if( componentId == 'fullscreen' && this.embedPlayer.isAudio() ){
				continue;
			}
			addComponent( componentId );
		}
		// Add special case remaining components:
		if( mw.getConfig( 'EmbedPlayer.EnableTimeDisplay' ) ){
			addComponent( 'timeDisplay' );
		}
		if( this.availableWidth > 30 ){
			addComponent( 'playHead' );
		}
		$(embedPlayer).trigger( 'controlBarBuildDone' );
	}