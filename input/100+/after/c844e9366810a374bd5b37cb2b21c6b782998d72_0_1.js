function(){

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

			}