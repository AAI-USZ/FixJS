function() {

		var _this = this;

		mw.log("EmbedPlayer::setupSourcePlayer: " + this.id + ' sources: ' + this.mediaElement.sources.length );

		

		// Check for source replace configuration: 

		if( mw.getConfig('EmbedPlayer.ReplaceSources' ) ){

			this.emptySources();

			$.each( mw.getConfig('EmbedPlayer.ReplaceSources' ), function( inx, source ){

				_this.mediaElement.tryAddSource( source );

			});

		}

		

		// Autoseletct the media source

		this.mediaElement.autoSelectSource();



		// Auto select player based on default order

		if( this.mediaElement.selectedSource ){

			this.selectedPlayer = mw.EmbedTypes.getMediaPlayers().defaultPlayer( this.mediaElement.selectedSource.mimeType );

			// Check if we need to switch player rendering libraries:

			if ( this.selectedPlayer && ( !this.prevPlayer || this.prevPlayer.library != this.selectedPlayer.library ) ) {

				// Inherit the playback system of the selected player:

				this.updatePlaybackInterface();

				return ;

			}

		}

		

		// Check if no player is selected

		if( !this.selectedPlayer || !this.mediaElement.selectedSource ){

			this.showPlayerError(); 

			mw.log( "EmbedPlayer:: setupSourcePlayer > player ready ( but with errors ) ");

		} else {

			// Trigger layout ready event

			$( this ).trigger( 'layoutReady' );

			// Show the interface: 

			this.$interface.find( '.control-bar').show();

			this.addLargePlayBtn();

		}

		// We still do the playerReady sequence on errors to provide an api 

		// and player error events

		this.playerReadyFlag = true;

		// trigger the player ready event;

		$( this ).trigger( 'playerReady' );

		this.triggerWidgetLoaded();

	}