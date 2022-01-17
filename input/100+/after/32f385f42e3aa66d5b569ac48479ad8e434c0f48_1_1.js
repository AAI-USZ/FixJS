function( vid,  adSlot, adConf ){

		var _this = this;

		if( !vid ){

			mw.log("KAdPlayer:: Error: displayVideoFile no vid to bind" );

			return ;

		}

		// start ad tracking

		this.adTrackingFlag = true;

		mw.log("KAdPlayer:: source updated, add tracking");

		// Always track ad progress:

		if( vid.readyState > 0 ) {

			_this.addAdTracking( adConf.trackingEvents );

		} else {

			$( vid ).bind('loadedmetadata', function() {

				_this.addAdTracking( adConf.trackingEvents );

			});

		}

		var helperCss = {

			'position': 'absolute',

			'color' : '#FFF',

			'font-weight':'bold',

			'text-shadow': '1px 1px 1px #000'

		};

		// Check runtimeHelper 

		if( adSlot.notice ){

			var noticeId =_this.embedPlayer.id + '_ad_notice';

			// Add the notice target:

			_this.embedPlayer.$interface.append(

				$('<span />')

					.attr( 'id', noticeId )

					.css( helperCss )

					.css( 'font-size', '90%' )

					.css( adSlot.notice.css )

			);

			var localNoticeCB = function(){

				if( _this.adTrackingFlag ){

					var timeLeft = Math.round( vid.duration - vid.currentTime );

					if( isNaN( timeLeft ) ){

						timeLeft = '...';

					}

					// Evaluate notice text: 

					$('#' + noticeId).text(

						_this.embedPlayer.evaluate( adSlot.notice.evalText )

					);

					setTimeout( localNoticeCB,  mw.getConfig( 'EmbedPlayer.MonitorRate' ) );

				}

			};

			localNoticeCB();

		}

		// Check for skip add button

		if( adSlot.skipBtn ){

			var skipId = _this.embedPlayer.id + '_ad_skipBtn';

			_this.embedPlayer.$interface.append(

				$('<span />')

					.attr('id', skipId)

					.text( adSlot.skipBtn.text )

					.css( helperCss )

					.css('cursor', 'pointer')

					.css( adSlot.skipBtn.css )

					.click(function(){

						$( _this.embedPlayer ).unbind( 'click' + _this.adClickPostFix );

						adSlot.playbackDone();

					})

			);

			// TODO move up via layout engine ( for now just the control bar )

			var bottomPos = parseInt( $('#' +skipId ).css('bottom') );

			if( !isNaN( bottomPos ) ){

				$('#' +skipId ).css('bottom', bottomPos + _this.embedPlayer.controlBuilder.getHeight() );

			}

		}

		// Support Audio controls on ads:

		$( _this.embedPlayer ).bind('volumeChanged' + _this.trackingBindPostfix, function( e, changeValue ){

			// when using siblings we need to adjust the sibling volume on volumeChange evnet.

			if( _this.isVideoSiblingEnabled() ) {

				vid.volume = changeValue;

			}

		});

		

		// AD slot should include flag for progress monitoring ( for now always update playhead )

		var progressMonitor = function(){

			if( _this.adTrackingFlag ){

				_this.embedPlayer.controlBuilder.setStatus( 

						mw.seconds2npt( vid.currentTime ) + '/' + mw.seconds2npt( vid.duration ) 

				);

				_this.embedPlayer.updatePlayHead( vid.currentTime / vid.duration );

				setTimeout(progressMonitor,  mw.getConfig( 'EmbedPlayer.MonitorRate' ) )

			}

		}

		progressMonitor();

	}