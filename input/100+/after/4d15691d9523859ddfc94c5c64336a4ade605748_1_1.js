function( ) {
		// Set up local pointer to the embedPlayer
		var embedPlayer = this.embedPlayer;
		var _this = this;
		var $interface = embedPlayer.$interface;

		_this.onControlBar = false;

		// Remove any old interface bindings
		$( embedPlayer ).unbind( this.bindPostfix );

		var bindFirstPlay = false;
		_this.addRightClickBinding();

		// check if the player takes up the full window size:
		if( $( embedPlayer ).width() == $(window).width() ){
			this.isWindowSizePlayer = true;
		}

		// add the player click bindings
		_this.addPlayerClickBindings();

		// Bind into play.ctrl namespace ( so we can unbind without affecting other play bindings )
		$(embedPlayer).bind('onplay' + this.bindPostfix, function() { //Only bind once played
			// add right click binding again ( in case the player got swaped )
			_this.addRightClickBinding();
		});

		// Bind to EnableInterfaceComponents
		$( embedPlayer ).bind( 'onEnableInterfaceComponents' + this.bindPostfix, function() {
			_this.controlsDisabled = false;
			_this.addPlayerClickBindings();
		});

		// Bind to DisableInterfaceComponents
		$( embedPlayer ).bind( 'onDisableInterfaceComponents' + this.bindPostfix, function() {
			_this.controlsDisabled = true;
			_this.removePlayerClickBindings();
		});


		var bindSpaceUp = function(){
			$(window).bind('keyup' + _this.bindPostfix, function(e) {
				if( e.keyCode == 32 ) {
					if(embedPlayer.paused) {
						embedPlayer.play();
					} else {
						embedPlayer.pause();
					}
					return false;
				}
			});
		};

		var bindSpaceDown = function() {
			$(window).unbind( 'keyup' + _this.bindPostfix );
		};
		
		// Bind to resize event
		/*
		var triggerUpdate;
		$( window ).resize(function() {
			// We use setTimeout because of iOS 4.2 issues
			clearTimeout(triggerUpdate);
			triggerUpdate = setTimeout(function() {
				//embedPlayer.triggerHelper('updateLayout');
			}, 100);
		});
		*/
		
		$(window).on("debouncedresize", function() {
			embedPlayer.triggerHelper('updateLayout');
		});		   
		
		// Add hide show bindings for control overlay (if overlay is enabled )
		if( ! _this.isOverlayControls() ) {
			$interface
				.show()
				.hover( bindSpaceUp, bindSpaceDown );

			// include touch start pause binding
			$( embedPlayer).bind( 'touchstart' + this.bindPostfix, function() {
				embedPlayer._playContorls = true;
				mw.log( "PlayerControlBuilder:: touchstart:"  + ' isPause:' + embedPlayer.paused);
				if( embedPlayer.paused ) {
					embedPlayer.play();
				} else {
					embedPlayer.pause();
				}
			});
		} else { // hide show controls:

			// Bind a startTouch to show controls
			$( embedPlayer).bind( 'touchstart' + this.bindPostfix, function() {
				if ( embedPlayer.$interface.find( '.control-bar' ).is( ':visible' ) ) {
					if( embedPlayer.paused ) {
						embedPlayer.play();
					} else {
						embedPlayer.pause();
					}
				} else {
					_this.showControlBar();
                }
				clearTimeout( _this.hideControlBarCallback );
				_this.hideControlBarCallback = setTimeout( function() {
					_this.hideControlBar()
				}, 5000 );
				// ( Once the user touched the video "don't hide" )
				return true;
			} );

			var hoverIntentConfig = {
					'sensitivity': 100,
					'timeout' : 1000,
					'over' : function(e){
						// Clear timeout on IE9
						if( mw.isIE9() ) {
							clearTimeout(_this.hideControlBarCallback);
							_this.hideControlBarCallback = false;
						}
						// Show controls with a set timeout ( avoid fade in fade out on short mouse over )
						_this.showControlBar();
						bindSpaceUp();
					},
					'out' : function(e){
						_this.hideControlBar();
						bindSpaceDown();
					}
				};

			// Check if we should display the interface:
			// special check for IE9 ( does not count hover on non-visiable inerface div
			if( mw.isIE9() ){
				$( embedPlayer.getPlayerElement() ).hoverIntent( hoverIntentConfig );

				// Add hover binding to control bar
				embedPlayer.$interface.find( '.control-bar' ).hover( function(e) {
					_this.onControlBar = true;
					embedPlayer.$interface.find( '.control-bar' ).show();
				}, function( e ) {
					if (!_this.hideControlBarCallback) {
						_this.hideControlBarCallback = setTimeout(function(){
							_this.hideControlBar();
						},1000);
					}
					_this.onControlBar = false;
				});

			} else {
				if ( !mw.isIpad() ) {
					$interface.hoverIntent( hoverIntentConfig );
				}
			}

		}

		// Add recommend firefox if we have non-native playback:
		if ( _this.checkNativeWarning( ) ) {
			_this.addWarningBinding(
				'EmbedPlayer.ShowNativeWarning',
				gM( 'mwe-embedplayer-for_best_experience' )
			);
		}

		// Do png fix for ie6
		if ( $.browser.msie && $.browser.version <= 6 ) {
			$( '#' + embedPlayer.id + ' .play-btn-large' ).pngFix();
		}

		this.doVolumeBinding();

		// Check if we have any custom skin Bindings to run
		if ( this.addSkinControlBindings && typeof( this.addSkinControlBindings ) == 'function' ){
			this.addSkinControlBindings();
		}

		mw.log( 'trigger::addControlBindingsEvent' );
		$( embedPlayer ).trigger( 'addControlBindingsEvent' );
	}