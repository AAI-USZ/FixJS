function( autoShow ) {
			var _this = this;
			var embedPlayer = this.embedPlayer;
			// Don't rebuild if menu already built
			if ( $( '#textMenuContainer_' + embedPlayer.id ).length ) {
				return false;
			}
			
			var $menuButton = this.embedPlayer.$interface.find( '.timed-text' );
			var positionOpts = { };
			if( this.embedPlayer.supports[ 'overlays' ] ){
				var positionOpts = {
					'directionV' : 'up',
					'offsetY' : this.embedPlayer.controlBuilder.getHeight(),
					'directionH' : 'left',
					'offsetX' : -28
				};
			}

			// Else bind and show the menu
			// We already have a loader in embedPlayer so the delay of
			// setupTextSources is already taken into account
			_this.setupTextSources( function() {
				var positionOpts = { };
				if( _this.embedPlayer.supports[ 'overlays' ] ){
					var positionOpts = {
						'directionV' : 'up',
						'offsetY' : _this.embedPlayer.controlBuilder.getHeight(),
						'directionH' : 'left',
						'offsetX' : -28
					};
				}
				
				if( !_this.embedPlayer.$interface ){
					mw.log("TimedText:: interface called before interface ready, just wait for interface");
					return ;
				}
				var $menuButton = _this.embedPlayer.$interface.find( '.timed-text' );
				// NOTE: Button target should be an option or config
				$menuButton.menu( {
					'content'	: _this.getMainMenu(),
					'zindex' : mw.getConfig( 'EmbedPlayer.FullScreenZIndex' ) + 2,
					'crumbDefaultText' : ' ',
					'autoShow': autoShow,
					'targetMenuContainer' : _this.getTextMenuContainer(),
					'positionOpts' : positionOpts,
					'backLinkText' : gM( 'mwe-timedtext-back-btn' ),
					'createMenuCallback' : function(){
						_this.embedPlayer.controlBuilder.showControlBar( true );
					},
					'closeMenuCallback' : function(){
						_this.embedPlayer.controlBuilder.keepControlBarOnScreen = false;
					}
				});
			});
		}