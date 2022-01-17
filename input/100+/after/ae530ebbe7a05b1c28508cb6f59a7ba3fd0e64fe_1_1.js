function () {
		mw.log( 'EmbedPlayer:: showPlayer: ' + this.id + ' interace: w:' + this.width + ' h:' + this.height );
		var _this = this;
		// Remove the player loader spinner if it exists
		this.hideSpinnerAndPlayBtn();
		// Set-up the local controlBuilder instance:
		this.controlBuilder = new mw.PlayerControlBuilder( this );

		// Set up local jQuery object reference to "mwplayer_interface"
		this.getPlayerInterface();

		// If a isPersistentNativePlayer ( overlay the controls )
		if( !this.useNativePlayerControls() && this.isPersistentNativePlayer() ){
			$( this ).show();
		}
		// Add controls if enabled:
		if ( this.controls ) {
			if( this.useNativePlayerControls() ){
				if( this.getPlayerElement() ){
					$(  this.getPlayerElement() ).attr('controls', "true");
				}
			} else {
				this.controlBuilder.addControls();
			}
		}

		// Update Thumbnail for the "player"
		this.updatePosterHTML();

		// Update temporal url if present
		this.updateTemporalUrl();

		// Do we need to show the player?
		if( this.displayPlayer === false ) {
			_this.getVideoHolder().hide();
			_this.$interface.height( _this.getComponentsHeight() );
			_this.triggerHelper('updateLayout');
			/*
			$( _this ).hide(); // Hide embed player
			$( '#' + _this.pid ).hide(); // Hide video tag
			this.$interface.css('height', this.controlBuilder.getHeight()); // Set the interface height to controlbar height
			*/
		}
		
		/*
		// Resize the player into the allocated space if aspect ratio is off: 
		var aspect = Math.round( ( this.width / this.height ) *10 )/10;
		if( aspect != this.controlBuilder.getIntrinsicAspect() ){
			this.controlBuilder.resizePlayer( {
				'width' : this.$interface.width(),
				'height' : this.$interface.height()
			} );
		}
		*/
	   
		this.updateLayout();
		
		// Update the playerReady flag
		this.playerReadyFlag = true;
		mw.log("EmbedPlayer:: Trigger: playerReady");
		// trigger the player ready event;
		$( this ).trigger( 'playerReady' );
		this.triggerWidgetLoaded();

		// Check if we want to block the player display
		if( this['data-blockPlayerDisplay'] ){
			this.blockPlayerDisplay();
			return ;
		}

		// Check if there are any errors to be displayed:
		if( this['data-playerError'] ){
			this.showErrorMsg( this['data-playerError'] );
			return ;
		}
		// Auto play stopped ( no playerReady has already started playback ) and if not on an iPad with iOS > 3 
		if ( this.isStopped() && this.autoplay && (!mw.isIOS() || mw.isIpad3() ) ) {
			mw.log( 'EmbedPlayer::showPlayer::Do autoPlay' );			
			_this.play();
		}
	}